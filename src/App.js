import React, { Component } from 'react';
// import { render } from 'react-dom';
import NavLink from './components/NavLink';
import { Menu, Icon, Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import AuthorizationForm from "./components/form/authorizationForm";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class App extends Component {
  state = {
    current: 'mail',
    visibleAuthForm: false,
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  showModal = () => {
    this.setState({ visibleAuthForm: true })
  }

  handleCancel = () => {
    this.setState({
      visibleAuthForm: false,
    });
  }

  renderModal = () => {
    return (
      <div>
        <Modal
          title="Авторизация"
          visible={this.state.visibleAuthForm}
          onCancel={this.handleCancel}
        >
          <Button> через VK </Button>
          <Button> через github </Button>
          <Button> через pornhub </Button>
        </Modal>
      </div>
    )
  }

  render() {

    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          className="mainBlock"
        >
          <Menu.Item key="projects" style={{ marginLeft: "30%" }}>
            <Icon type="smile" />проекты
            <NavLink onlyActiveOnIndex={true} to='/'></NavLink>
          </Menu.Item>
          <Menu.Item key="comrades" >
            <Icon type="smile" />камрады
            <NavLink onlyActiveOnIndex={true} to='/comrades'></NavLink>
          </Menu.Item>
          <SubMenu title={<span className="submenu-title-wrapper"><Icon type="form" />Войти</span>} style={{ float: "right" }}>
            <MenuItemGroup >
              <Menu.Item key="authorization" onClick={this.showModal}>Авторизоваться
                {/* <NavLink to='/authorization' activeClassName='active'></NavLink> */}
              </Menu.Item>
              <Menu.Item key="registration">Регистрация
                <NavLink to='/registration' activeClassName='active'></NavLink>
              </Menu.Item>
              <Menu.Item key="profile">Профиль
                <NavLink to='/profile' activeClassName='active'></NavLink>
              </Menu.Item>
              <Menu.Item key="exitProfile">Выйти
              <NavLink to='/exitProfile' activeClassName='active'></NavLink>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
        {this.props.children}
        {this.state.visibleAuthForm ? this.renderModal() : null }
      </div>
    );
  }
}
