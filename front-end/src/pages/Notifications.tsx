
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, MessageSquare, Award, Users, Settings, Mail, Smartphone, Globe, X } from "lucide-react";
import NotificationsComponent from "../components/Notifications";
import { useAuth } from "../contexts/AuthContext";

const Notifications = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const notificationSettings = {
    email: {
      answers: true,
      mentions: true,
      accepted: true,
      bounties: false,
      community: true
    },
    push: {
      answers: true,
      mentions: true,
      accepted: false,
      bounties: true,
      community: false
    },
    browser: {
      answers: true,
      mentions: true,
      accepted: true,
      bounties: true,
      community: true
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Bell className="w-6 h-6" />
                  Notifications
                </h1>
                <p className="text-muted-foreground">
                  Stay updated with your activity
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  Mark all as read
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Real-time Notifications List */}
              <div className="lg:col-span-2">
                <NotificationsComponent userId={userId} />
              </div>

              {/* Notification Settings */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Email Notifications */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Mail className="w-4 h-4" />
                        <h3 className="font-medium">Email Notifications</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">New answers</span>
                          <Switch defaultChecked={notificationSettings.email.answers} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Mentions</span>
                          <Switch defaultChecked={notificationSettings.email.mentions} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Accepted answers</span>
                          <Switch defaultChecked={notificationSettings.email.accepted} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Bounty questions</span>
                          <Switch defaultChecked={notificationSettings.email.bounties} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Community updates</span>
                          <Switch defaultChecked={notificationSettings.email.community} />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Push Notifications */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Smartphone className="w-4 h-4" />
                        <h3 className="font-medium">Push Notifications</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">New answers</span>
                          <Switch defaultChecked={notificationSettings.push.answers} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Mentions</span>
                          <Switch defaultChecked={notificationSettings.push.mentions} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Accepted answers</span>
                          <Switch defaultChecked={notificationSettings.push.accepted} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Bounty questions</span>
                          <Switch defaultChecked={notificationSettings.push.bounties} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Community updates</span>
                          <Switch defaultChecked={notificationSettings.push.community} />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Browser Notifications */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-4 h-4" />
                        <h3 className="font-medium">Browser Notifications</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">New answers</span>
                          <Switch defaultChecked={notificationSettings.browser.answers} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Mentions</span>
                          <Switch defaultChecked={notificationSettings.browser.mentions} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Accepted answers</span>
                          <Switch defaultChecked={notificationSettings.browser.accepted} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Bounty questions</span>
                          <Switch defaultChecked={notificationSettings.browser.bounties} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Community updates</span>
                          <Switch defaultChecked={notificationSettings.browser.community} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
