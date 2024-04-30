import '@styles/Footer.scss';
import { AiOutlineMail, AiOutlineGithub, AiOutlineBold } from 'react-icons/ai';

const membersData = [
  {
    name: '유현욱',
    email: 'yho7955@naver.com',
    github: 'https://github.com/YuHyeonWook',
    blog: 'https://yho7955.tistory.com/',
  },
  {
    name: '김령태',
    email: 'rt990122@gmail.com',
    github: 'https://github.com/catrt',
    blog: 'https://catrt.tistory.com/',
  },
  {
    name: '김여진',
    email: 'duwls1503@gmail.com',
    github: 'https://github.com/Yeojin-Kim12',
    blog: 'https://velog.io/@duwls1503/posts',
  },
  {
    name: '박수민',
    email: 'dogcs1289@naver.com',
    github: 'https://github.com/nakjilove',
    blog: 'https://blog.naver.com/dogcs1289',
  },
];

const Footer = () => {
  return (
    <footer>
      <div className="inner">
        <div className="meta">
          <a
            className="github"
            href="https://github.com/FC8-TOY1/DogManagementService"
            target="_blank"
            rel="noopener noreferrer">
            GitHub Repository
          </a>
          <div className="copyright">
            Copyright © {new Date().getFullYear()} FastCampus Toy1 - TEAM1
          </div>
        </div>
        <div className="members">
          {membersData.map((member) => {
            return (
              <div key={member.name} className="member">
                <div className="name">{member.name}</div>
                <div className="links">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <AiOutlineMail style={{ color: '#5a5a5a' }} />
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <AiOutlineGithub style={{ color: '#5a5a5a' }} />
                  </a>
                  <a href={member.blog} target="_blank" rel="noopener noreferrer">
                    <AiOutlineBold style={{ color: '#5a5a5a' }} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
