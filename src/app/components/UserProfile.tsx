'use client'

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react'
import { useSession } from "next-auth/react";
import { useAtom } from 'jotai';
import { userAtom } from '@/store/userAtom';
import { useQuery } from '@tanstack/react-query';
import { Card, Image, Text, Badge, Button, Group, CopyButton } from '@mantine/core';

// ログイン、ログアウト機能用の仮コンポーネント
export default function UserProfile() {
  // クライアントセッション
  const { data: session, status } = useSession()
  // セッションユーザーのemailを使用してユーザー情報を取得
  const [user, setUser] = useAtom(userAtom);
  if (session != null) {
    setUser(session.user?.email ?? null);
  }
  /**
   * 
   * sessionがない場合はsignページにリダイレクト
   */


  // TanStackのuseQueryを使用してデータを取得
  const fetchUsers = async () => {
    const res = await fetch(session ? '/api/user' : "");
    return res.json();
  };

  const { data: users, isError
    , isLoading,
    ...others } = useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
    });
  // ローカルでどのようなユーザー情報を持たせるかは要検討

  console.log("⭐️users⭐️", users)
  console.log("⭐️users⭐️", others)
  console.log("⭐️session⭐️", session)

  if (session && session.user) {
    return (
      <div>
        <p>Welcome, {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        {/* tanstackで取得したユーザー情報サンプル */}
        {users && users.users.map((user: any) => {
          return (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{"email:"}{user.email}</p>
            </div>
          )
        }
        )}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Norway Fjord Adventures</Text>
            <Badge color="pink">On Sale</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text>

          <Button color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button>
        </Card>
        <CopyButton value="https://mantine.dev">
          {({ copied, copy }) => (
            <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
              {copied ? 'Copied url' : 'Copy url'}
            </Button>
          )}
        </CopyButton>
      </div>
    );
  }

  return <p>Not signed in</p>;
}

