3个层级: 
  nav-category 组件
    nav-group 基础，进阶
      nav-item 1, 2, 3, 4

需要的props:
  navData,
  className,

需要支持以下各种层级:

  [
    {
      "title": "组件",
      "groups": [
        {
          "title": "基础",
          "items": [
            {
              "title": "color picker",
              "path": "colorpicker"
            }
          ]
        },
        {
          "title": "数据",
          "items": [
            {
              "title": "steps",
              "path": "steps"
            }
          ]
        }
      ]
    },
  ]