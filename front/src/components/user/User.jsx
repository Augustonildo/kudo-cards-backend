import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
import CardList from '../card/CardList';
import Filter from '../filter/Filter';
import styles from './User.module.css';
import useAuth from '../../hooks/useAuth/useAuth';
import useUsers from '../../hooks/useUsers/useUsers';
import useKudos from '../../hooks/useKudos/useKudos';

export default function User() {
  const { getLoggedUser } = useAuth();
  const { users } = useUsers();
  const { kudos } = useKudos();
  const userInfo = users?.find(({ email }) => email === getLoggedUser());
  const filterConditions = {
    receiver: '',
    sender: '',
    message: '',
  };
  const myKudos = kudos?.filter(
    (kudo) => kudo.sender.value === userInfo?.email || kudo.recipient.value === userInfo?.email
  );

  return (
    <div className={styles.user}>
      <div className={styles.profileBackground}>
        <div>
          <Link to="/" className={styles.returnButton}>
            <span className={styles.returnButtonIcon}>
              <FiArrowLeft />
            </span>
            <span>Voltar</span>
          </Link>
        </div>
      </div>
      <div className={styles.userImage}>
        <Avatar name={userInfo?.name} size={104} radius={50} />
      </div>
      <p className={styles.username}> {userInfo?.name} </p>
      <Filter filterConditions={filterConditions} />
      <div className={styles.userCardList}>
        <CardList kudos={myKudos} />
      </div>
    </div>
  );
}
