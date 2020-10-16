import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import './ContactUs.css';
import logo from '../../assets/images/logo.svg';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1629955_27uzalcrqrmj.js',
});

function ContactUs() {
  const itemsData = [
    {
      href: 'https://github.com/tuture-dev/tuture',
      icon: 'icon-github-fill',
      labelText: '写作工具地址',
    },
    {
      href: 'https://zhuanlan.zhihu.com/tuture',
      icon: 'icon-zhihu-circle-fill',
      labelText: '知乎专栏',
    },
    {
      href: 'https://tuture.co/images/social/wechat.png',
      icon: 'icon-wechat',
      labelText: '微信公众号',
    },
    {
      href: 'https://juejin.im/user/5b33414351882574b9694d28',
      icon: 'icon-juejin',
      labelText: '掘金专栏',
    },
    {
      href: 'https://www.imooc.com/u/8413857/articles',
      icon: 'icon-mukewang',
      labelText: '慕课手记',
    },
  ];
  return (
    <div className="contact-us">
      <a
        href="https://tuture.co/"
        className="contact-us-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="contact-us-icon" src={logo} alt="tuture" />
        <span className="contact-us-label">图雀社区主站</span>
        <IconFont className="contact-us-arrow" type="icon-arrowright" />
      </a>
      {itemsData.map((item) => (
        <a
          key={item.icon}
          href={item.href}
          className="contact-us-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconFont className="contact-us-icon" type={item.icon} />
          <span className="contact-us-label">{item.labelText}</span>
          <IconFont className="contact-us-arrow" type="icon-arrowright" />
        </a>
      ))}
    </div>
  );
}

export default ContactUs;
