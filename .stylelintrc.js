module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier'
  ],
  customSyntax: 'postcss-less',
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    indentation: 2, // 缩进
    'no-eol-whitespace': true,
    'rule-empty-line-before': [
      // 要求或禁止在规则声明之前有空行
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    'at-rule-empty-line-before': [
      // 要求或禁止在 at 规则之前有空行
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment']
      }
    ],
    'comment-empty-line-before': [
      // 要求或禁止在注释之前有空行
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands']
      }
    ],
    'block-closing-brace-empty-line-before': 'never', // 结尾是否允许空行
    'block-no-empty': true, // 禁止出现空块
    'declaration-empty-line-before': 'never', // 要求或禁止在声明语句之前有空行。
    'declaration-block-no-duplicate-properties': true, // 在声明的块中中禁止出现重复的属性
    'shorthand-property-no-redundant-values': true, // 禁止在简写属性中使用冗余值。
    'color-hex-length': 'short', // 指定十六进制颜色是否使用缩写
    // 'color-named': 'never', // 要求 (可能的情况下) 或 禁止使用命名的颜色
    'comment-no-empty': true, // 禁止空注释
    'font-family-name-quotes': 'always-unless-keyword', // 指定字体名称是否需要使用引号引起来 | 期待每一个不是关键字的字体名都使用引号引起来
    'value-no-vendor-prefix': true, // 禁止给值添加浏览器引擎前缀
    'selector-no-vendor-prefix': true, // 禁止使用浏览器引擎前缀
    'no-descending-specificity': null, // 禁止低优先级的选择器出现在高优先级的选择器之后
    'font-family-no-missing-generic-family-keyword': null,
    'selector-class-pattern': '^.+', // 暂时不做选择器命名限制
    'keyframes-name-pattern': '^.+', // 暂时不做动画名的命名限制
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'] // 允许使用 :global 规则
      }
    ]
  }
}
