import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrophyIcon, UserCheckIcon, UsersIcon } from "lucide-react";
import { Checkins } from "./checkins";
import { Participants } from "./participants";
import { Ranking } from "./ranking";

export function AppTabs() {
  return (
    <Tabs defaultValue="checkins">
      <TabsList>
        <TabsTrigger value="checkins">
          <UserCheckIcon /> Check-in
        </TabsTrigger>
        <TabsTrigger value="people">
          <UsersIcon /> Participantes
        </TabsTrigger>
        <TabsTrigger value="ranking">
          <TrophyIcon /> Ranking
        </TabsTrigger>
      </TabsList>
      <TabsContent value="checkins">
        <Checkins />
      </TabsContent>
      <TabsContent value="people">
        <Participants />
      </TabsContent>
      <TabsContent value="ranking">
        <Ranking />
      </TabsContent>
    </Tabs>
  );
}
