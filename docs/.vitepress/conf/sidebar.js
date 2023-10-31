export default {
    // '/api/': getApiSidebar(),
    '/component/': getComponentsSidebar(),
    '/guide/': getGuideSidebar()
}
  
  function getApiSidebar() {
    return [
      {
        text: '功能',
        collapsible: true,
        items: [
          {
            text: '已实现',
            link: '/api/'
          },
        ]
      }
    ]
  }
  
  function getComponentsSidebar() {
    return [
      {
        text: '组件',
        items: [
          {
            text: 'Button 按钮',
            link: '/component/button'
          },
          {
            text: 'Avatar',
            link: '/component/avatar'
          }
        ]
      }
    ]
  }
  
  function getGuideSidebar() {
    return [
      {
        text: '指南',
        items: [
          {
            text: '文档1',
            link: '/guide/index'
          },
          {
            text: '文档2',
            link: '/guide/basic'
          },
          {
            text: '文档3',
            link: '/guide/other'
          }
        ]
      }
    ]
  }