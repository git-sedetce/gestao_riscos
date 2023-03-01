import useSWR from "swr";
import styles from "../../../../styles/slideCategory.module.scss";
import authService, { UserType } from "../../../../src/services/authService";
import PageSpinner from "../../common/spinner";
import ListUserSlide from "../listUserSlide";

const ListUsers = function () {
  const { data: userData, error: userError } = useSWR(
    "/listUsers",
    authService.getUsers
  );

  if (userError) return userError;

  if (!userData) {
    return <PageSpinner />;
  }

  return (
    <>
      <p className={styles.titleCategory}>USUÁRIOS</p>
      {userData.data.map((user: UserType) => (
        <ListUserSlide key={user.id} userId={user.id} userName={user.name} />
      ))}
    </>
  );
};

export default ListUsers;
