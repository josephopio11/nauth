import { auth } from "@/auth";
import { db } from "@/lib/database/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/api/auth/signin?callbackUrl=/profile");
  }

  const posts = await db.post.findMany();
  return (
    <div className="p-4 flex flex-col gap-8">
      <div className="flex flex-row justify-between">
        <h1>Profile</h1>
        <Link href={"/api/auth/signout"}>SignOut</Link>
      </div>
      <div className="flex flex-row">
        <div>
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
        </div>
        <div>
          <Image
            src={session?.user?.image!}
            alt={session?.user?.name!}
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      </div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
