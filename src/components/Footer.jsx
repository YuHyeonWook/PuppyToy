import '../styles/Footer.scss';
import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineGithub, AiOutlineBold } from 'react-icons/ai';

const Footer = () => {
  const membersData = [
    {
      name: '유현욱',
      email: 'yho7955@naver.com',
      github: 'https://yho7955.tistory.com/',
      blog: 'https://github.com/YuHyeonWook',
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
      github: 'https://blog.naver.com/dogcs1289',
      blog: 'https://github.com/nakjilove',
    },
  ];

  const [members] = useState(membersData);

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
            Copyright © {new Date().getFullYear()} FastCampus Toy1 - TEAM1.
          </div>
        </div>
        <div className="members">
          {members.map((member) => {
            return (
              <div key={member.name} className="member">
                <div className="name">{member.name}</div>
                <a
                  className="email"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  <AiOutlineMail style={{ color: '#000' }} />
                </a>
                <a
                  className="github"
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer">
                  <AiOutlineGithub style={{ color: '#000' }} />
                </a>
                <a className="blog" href={member.blog} target="_blank" rel="noopener noreferrer">
                  <AiOutlineBold style={{ color: '#000' }} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
