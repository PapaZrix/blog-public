import styles from '../styles/About.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function About({}) {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.about}>
          <div className={styles['header-section']}>
            <h2>ABOUT US</h2>
          </div>
          <div className={styles.text}>
            <p>
              For a while now Fabijan wanted to write about a passion of mine.
              Dominik offered to create a website where Fabijan could post
              articles, and since the will and the passion were there, he agreed
              to the idea and started writing. Some of our current favorite
              games, in no particular order, are God of War (2018), Nier
              Automata, Bloodborne, Dark Souls Remastered, Red Dead Redemption
              2, Assassin&apos;s Creed Origins, Batman Arkham Asylum,
              Marvel&apos;s Spider-man, The Witcher 3, Borderlands, Cuphead,
              Infamous 2, Ghost of Tsushima, Horizon Zero Dawn, and Grand Theft
              Auto IV, and you should expect content about all these games and
              much more.
            </p>
            <p>
              We would absolutely love it and appreciate it if you would also
              share your opinions on the games you love and play, as well as
              your thoughts on what we have written. As of now, the focus is on
              sharing thoughts on first impressions, gameplay, level/world
              design, and atmosphere of games we play, with a lesser emphasis on
              stories. We primarily play titles from 5 years ago or more, as
              there are so many incredible games I have missed (e.g., the Elder
              Scrolls franchise, the Mass Effect Trilogy…). You can expect posts
              every week. We hope you will find enjoyment in reading about these
              more positive takes on video games, and feel free to share your
              agreements or disagreements about each and any of them. Love you
              all.
            </p>
          </div>
        </div>
        <div>
          <h2 className={styles.header}>Our Team</h2>
          <div className={styles.card}>
            <div style={{ display: 'flex', marginTop: '1rem' }}>
              <div className={styles.image}>
                <Link href='/author/fabijan-balen'>
                  <a>
                    <Image
                      src='/images/fabo.jpg'
                      alt='author photo'
                      layout='fill'
                      objectFit='cover'
                      objectPosition='50% 50%'
                      priority
                      placeholder='blur'
                      blurDataURL='/images/fabo.jpg'
                    />
                  </a>
                </Link>
              </div>
              <div className={styles.info}>
                <div>
                  <Link href='/author/fabijan-balen'>
                    <h2 className={styles.name}>Fabijan Balen</h2>
                  </Link>
                  <p className={styles.role}>Main Author</p>
                </div>
                <p className={styles.description}>
                  Ever since I have known about myself I was interested in video
                  games. My older brother was likely a good reason for this, as
                  he owned both PlayStation 1 and 2. Although I played a lot of
                  games on those consoles, my first console was PlayStation 3
                  and my first game for it was Grand Theft Auto IV. This is what
                  I see as the true start of my video gaming journey. I
                  exclusively play single-player experiences, and for a while
                  now, I have owned both a PlayStation 4 and an Xbox One. On
                  these consoles, I have played and finished more games than
                  ever before in my life and have expanded my interest in genres
                  and titles I used to overlook.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.image}>
              <Image
                src='/images/zrix.jpg'
                alt='author photo'
                layout='fill'
                objectFit='cover'
                objectPosition='50% 50%'
                priority
                placeholder='blur'
                blurDataURL='/images/zrix.jpg'
              />
            </div>
            <div className={styles.info}>
              <div>
                <h2 className={styles.name}>Dominik Zrilić</h2>
                <p className={styles.role}>Site Manager</p>
              </div>
              <p className={styles.description}>
                I&apos;ve been a huge video game fan ever since I was a little
                boy. Started off with consoles and then progressively
                transitioned into PC gaming by playing MMO&apos;s and MOBA&apos;
                such as WoW and LoL. Since I&apos;ve gotten into programming,
                more specifically web development, I wanted to give Fabijan a
                platform to express his thoughts and feelings on some of his
                favorite video games, and that&apos;s how I got involved in
                making this blog. My goal is to make this blog a place where
                people can come and leave their opinions on some of the games we
                cover.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
