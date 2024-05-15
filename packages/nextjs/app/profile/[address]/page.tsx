"use client";

import type { NextPage } from "next";
import { ProfilePage } from "~~/components/beras/ProfilePage";

// @ts-ignore
const Profile: NextPage = ({ params }) => {
  return (
    <div className="w-full gap-5">
      <ProfilePage address={params.address} />
    </div>
  );
};

export default Profile;
