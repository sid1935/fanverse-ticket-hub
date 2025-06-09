
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const EmptyEventsState = () => {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">No Events Yet</h2>
      <p className="text-gray-300 mb-6">You haven't created any events. Start by creating your first event!</p>
      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
        Create Your First Event
      </Button>
    </Card>
  );
};
