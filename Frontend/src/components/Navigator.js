import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import '../containers/Header/Header.scss';

class MenuGroup extends Component {

    render() {
        const { name, children } = this.props;
        return (
            <li >
                <div className="menu-group-name">
                    <FormattedMessage id={name} />
                </div>
                <ul className="menu-list list-unstyled">
                    {children}
                </ul>
            </li>
        );
    }
}

class Menu extends Component {
    render() {
        const { name, icon, link, children, onClick, hasSubMenu, onLinkClick, isOpen } = this.props;


        return (
            <li >
                {hasSubMenu ? (
                    <Fragment>
                        <a className={`menu-link ${isOpen ? 'active' : ''}`} onClick={onClick}>
                            <i className={`fa ${icon} icon`} />
                            <FormattedMessage id={name} />
                            <i className="fa fa-chevron-right icon-right" />
                        </a>
                        <ul className={`side-dropdown ${isOpen ? 'show' : ''}`}>
                            {children}
                        </ul>
                    </Fragment>
                ) : (
                    <Link to={link} onClick={onLinkClick}>
                        <i className={`fa ${icon} icon`} />
                        <FormattedMessage id={name} />
                    </Link>
                )}
            </li>
        );
    }
}

class SubMenu extends Component {
    getItemClass = path => this.props.location.pathname === path ? "active" : "";

    render() {
        const { name, link, onLinkClick } = this.props;
        return (
            <li >
                <Link to={link} className="sub-menu-link" onClick={onLinkClick}>
                    <FormattedMessage id={name} />
                </Link>
            </li>
        );
    }
}

const MenuGroupWithRouter = withRouter(MenuGroup);
const MenuWithRouter = withRouter(Menu);
const SubMenuWithRouter = withRouter(SubMenu);

const withRouterInnerRef = (WrappedComponent) => {

    class InnerComponentWithRef extends React.Component {
        render() {
            const { forwardRef, ...rest } = this.props;
            return <WrappedComponent {...rest} ref={forwardRef} />;
        }
    }

    const ComponentWithRef = withRouter(InnerComponentWithRef, { withRef: true });

    return React.forwardRef((props, ref) => {
        return <ComponentWithRef {...props} forwardRef={ref} />;
    });
};

class Navigator extends Component {
    state = {
        expandedMenu: {},

    };

    toggle = (groupIndex, menuIndex) => {
        const key = `${groupIndex}_${menuIndex}`;
        this.setState(prevState => ({
            expandedMenu: {
                ...prevState.expandedMenu,
                [key]: !prevState.expandedMenu[key]
            }
        }));
    };


    isMenuHasSubMenuActive = (location, subMenus, link) => {
        if (subMenus) {
            if (subMenus.length === 0) {
                return false;
            }

            const currentPath = location.pathname;
            for (let i = 0; i < subMenus.length; i++) {
                const subMenu = subMenus[i];
                if (subMenu.link === currentPath) {
                    return true;
                }
            }
        }

        if (link) {
            return this.props.location.pathname === link;
        }

        return false;
    };

    checkActiveMenu = () => {
        const { menus, location } = this.props;
        const expandedMenu = { ...this.state.expandedMenu };

        for (let i = 0; i < menus.length; i++) {
            const group = menus[i];
            for (let j = 0; j < group.menus.length; j++) {
                const menu = group.menus[j];
                const key = `${i}_${j}`;

                const hasSubMenu = Array.isArray(menu.subMenus) && menu.subMenus.length > 0;

                if (hasSubMenu && this.isMenuHasSubMenuActive(location, menu.subMenus, null)) {
                    expandedMenu[key] = false;
                }
            }
        }

        this.setState({ expandedMenu });
    };



    componentDidMount() {
        this.checkActiveMenu();
    };

    // componentWillReceiveProps(nextProps, prevState) {
    //     const { location, setAccountMenuPath, setSettingMenuPath } = this.props;
    //     const { location: nextLocation } = nextProps;
    //     if (location !== nextLocation) {
    //         let pathname = nextLocation && nextLocation.pathname;
    //         if ((pathname.startsWith('/account/') || pathname.startsWith('/fds/account/'))) {
    //             setAccountMenuPath(pathname);
    //         }
    //         if (pathname.startsWith('/settings/')) {
    //             setSettingMenuPath(pathname);
    //         };
    //     };
    // };

    componentDidUpdate(prevProps, prevState) {
        const { location } = this.props;
        const { location: prevLocation } = prevProps;
        if (location !== prevLocation) {
            this.checkActiveMenu();
        };
    };

    render() {
        const { menus, location, onLinkClick } = this.props;
        return (
            <Fragment>
                {menus.map((group, groupIndex) => (
                    <Fragment key={groupIndex}>
                        {group.menus?.map((menu, menuIndex) => {
                            const key = groupIndex + '_' + menuIndex;
                            const isMenuHasSubMenuActive = this.isMenuHasSubMenuActive(location, menu.subMenus, menu.link);
                            const isSubMenuOpen = this.state.expandedMenu[key];

                            return (
                                <MenuWithRouter
                                    key={menuIndex}

                                    name={menu.name}
                                    icon={menu.icon || 'fa-circle'}
                                    link={menu.link}
                                    hasSubMenu={Array.isArray(menu.subMenus) && menu.subMenus.length > 0}
                                    isOpen={isSubMenuOpen}
                                    onClick={() => this.toggle(groupIndex, menuIndex)}
                                    onLinkClick={onLinkClick}
                                >
                                    {menu.subMenus?.map((subMenu, subMenuIndex) => (
                                        <SubMenuWithRouter
                                            key={subMenuIndex}
                                            name={subMenu.name}
                                            link={subMenu.link}
                                            onLinkClick={onLinkClick}
                                        />
                                    ))}
                                </MenuWithRouter>
                            );
                        })}
                    </Fragment>
                ))}


            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default withRouterInnerRef(connect(mapStateToProps, mapDispatchToProps)(Navigator));