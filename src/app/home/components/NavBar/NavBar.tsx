import { Skeleton } from "@mantine/core";

const NavBar = () => {
  return (
    <>
      Navbar
      {Array(15)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} h={28} mt="sm" animate={false} />
        ))}
    </>
  );
};

export default NavBar;
