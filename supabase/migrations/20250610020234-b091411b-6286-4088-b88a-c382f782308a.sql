
-- Fix the handle_new_user function to properly handle role casting
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
