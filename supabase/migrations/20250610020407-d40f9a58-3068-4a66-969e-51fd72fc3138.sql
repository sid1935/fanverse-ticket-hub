
-- Create the user_role enum type if it doesn't exist
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('fan', 'organizer', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create the trigger for handling new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email),
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'role' = 'organizer' THEN 'organizer'::user_role
      WHEN NEW.raw_user_meta_data ->> 'role' = 'admin' THEN 'admin'::user_role
      ELSE 'fan'::user_role
    END
  );
  RETURN NEW;
END;
$$;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
