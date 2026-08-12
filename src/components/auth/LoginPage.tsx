import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth, FIXED_USERNAME } from "@/contexts/AuthContext";

export function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username.trim() !== FIXED_USERNAME) {
      setError(
        t("auth.invalidUsername", {
          defaultValue: "用户名不正确，请输入 admin",
        }),
      );
      return;
    }
    setError(null);
    login(FIXED_USERNAME);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">CC Switch</CardTitle>
          <CardDescription>
            {t("auth.welcome", {
              defaultValue: "请登录后继续使用",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setError(null);
                  }}
                  placeholder={t("auth.usernamePlaceholder", {
                    defaultValue: "用户名",
                  })}
                  className="pl-9"
                  autoFocus
                />
              </div>
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={!username.trim()}
            >
              <LogIn className="h-4 w-4 mr-2" />
              {t("auth.login", { defaultValue: "登录" })}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
