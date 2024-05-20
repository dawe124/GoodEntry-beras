import { ProfileCard } from "~~/components/beras/profile/ProfileCard";

export const ProfilePage = ({ address }: { address: string }) => {
  return (
    <>
      <div className="flex flex-row min-h-full w-full mx-auto">
        <div className="md:w-[600px] w-full md:pl-5 md:pt-5 mx-auto">
          <ProfileCard address={address} />
          <div className="w-full bg-base-100 rounded-[1rem] md:p-5 p-2 mt-5">
            <p>Coming Soon...</p>
            <p>*Excited Ooga Booga*</p>
          </div>
        </div>
      </div>
    </>
  );
};
