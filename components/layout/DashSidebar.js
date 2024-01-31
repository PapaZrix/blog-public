import styles from './DashSidebar.module.css'
import { MdOutlineArticle, MdOutlineCollections, MdOutlineSupervisedUserCircle } from "react-icons/md";

export default function Sidebar({ handleSwitch, activeTab }) {
    return (
        <div className={styles.container}>
            <ul className={styles.nav}>
                <li style={{ backgroundColor: activeTab === 'posts' ? '#dedede' : '' }} onClick={handleSwitch} id='posts' ><MdOutlineArticle size={'2rem'} /> Posts</li>
                <li style={{ backgroundColor: activeTab === 'collections' ? '#dedede' : '' }} onClick={handleSwitch} id='collections'><MdOutlineCollections size={'2rem'} /> Collections</li>
                <li style={{ backgroundColor: activeTab === 'users' ? '#dedede' : '' }} onClick={handleSwitch} id='users'><MdOutlineSupervisedUserCircle size={'2rem'} />Users</li>
            </ul>
        </div>
    )
}