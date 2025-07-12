
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, MessageSquare, Award, Users, Settings, Mail, Smartphone, Globe, X } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "answer",
      title: "New answer on your question",
      description: "Someone answered your question about JWT authentication",
      time: "2 minutes ago",
      read: false,
      icon: MessageSquare
    },
    {
      id: 2,
      type: "mention",
      title: "You were mentioned",
      description: "@sarah_dba mentioned you in a comment",
      time: "1 hour ago",
      read: false,
      icon: Users
    },
    {
      id: 3,
      type: "accepted",
      title: "Your answer was accepted",
      description: "Your answer about React hooks was marked as accepted",
      time: "3 hours ago",
      read: true,
      icon: Award
    },
    {
      id: 4,
      type: "bounty",
      title: "New bounty question in your tags",
      description: "A new question with a $50 bounty was posted in React",
      time: "4 hours ago",
      read: false,
      icon: Award
    },
    {
      id: 5,
      type: "community",
      title: "New member joined your community",
      description: "john_dev joined the React Developers community",
      time: "6 hours ago",
      read: true,
      icon: Users
    }
  ];

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
              {/* Notifications List */}
              <div className="lg:col-span-2">
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            notification.type === 'answer' ? 'bg-blue-100 dark:bg-blue-900' :
                            notification.type === 'mention' ? 'bg-green-100 dark:bg-green-900' :
                            notification.type === 'bounty' ? 'bg-purple-100 dark:bg-purple-900' :
                            notification.type === 'community' ? 'bg-indigo-100 dark:bg-indigo-900' :
                            'bg-orange-100 dark:bg-orange-900'
                          }`}>
                          <notification.icon className={`w-5 h-5 ${
                            notification.type === 'answer' ? 'text-blue-600 dark:text-blue-400' :
                            notification.type === 'mention' ? 'text-green-600 dark:text-green-400' :
                            notification.type === 'bounty' ? 'text-purple-600 dark:text-purple-400' :
                            notification.type === 'community' ? 'text-indigo-600 dark:text-indigo-400' :
                            'text-orange-600 dark:text-orange-400'
                          }`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{notification.title}</h3>
                              <div className="flex items-center gap-2">
                                {!notification.read && (
                                  <Badge variant="secondary" className="text-xs">New</Badge>
                                )}
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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

                    <Separator />

                    {/* Additional Settings */}
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full">
                        <Mail className="w-4 h-4 mr-2" />
                        Test Email Notification
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Test Push Notification
                      </Button>
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
