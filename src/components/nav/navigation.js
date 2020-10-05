import React from 'react';

function Navigation() {
  function mainNavigation(navigationItems) {
    return (
      <nav>
        { navigationItems.map(item => {
          return <p key={item}>{item}</p>
        }) }
      </nav>
    )
  }

  function mainRender() {
    return mainNavigation(['Home'])
  }

  return (
    mainRender()
  )
}

export default Navigation;