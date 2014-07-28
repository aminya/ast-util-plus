var b = require('ast-types').builders;
module.exports = function(scope) {
  return b.functionExpression(
  b.identifier('get'),
  [
    b.identifier('object'),
    b.identifier('property'),
    b.identifier('receiver')
  ],
  b.blockStatement([
    b.variableDeclaration(
      'var',
      [
        b.variableDeclarator(
          b.identifier('desc'),
          b.callExpression(
            b.memberExpression(
              b.identifier('Object'),
              b.identifier('getOwnPropertyDescriptor'),
              false
            ),
            [
              b.identifier('object'),
              b.identifier('property')
            ]
          )
        )
      ]
    ),
    b.ifStatement(
      b.binaryExpression(
        '===',
        b.identifier('desc'),
        b.unaryExpression(
          'void',
          b.literal(0),
          true
        )
      ),
      b.blockStatement([
        b.variableDeclaration(
          'var',
          [
            b.variableDeclarator(
              b.identifier('parent'),
              b.callExpression(
                b.memberExpression(
                  b.identifier('Object'),
                  b.identifier('getPrototypeOf'),
                  false
                ),
                [b.identifier('object')]
              )
            )
          ]
        ),
        b.ifStatement(
          b.binaryExpression(
            '===',
            b.identifier('parent'),
            b.literal(null)
          ),
          b.blockStatement([
            b.returnStatement(
              b.unaryExpression(
                'void',
                b.literal(0),
                true
              )
            )
          ]),
          b.blockStatement([
            b.returnStatement(
              b.callExpression(
                b.identifier('get'),
                [
                  b.identifier('parent'),
                  b.identifier('property'),
                  b.identifier('receiver')
                ]
              )
            )
          ])
        )
      ]),
      b.ifStatement(
        b.logicalExpression(
          '&&',
          b.binaryExpression(
            'in',
            b.literal('value'),
            b.identifier('desc')
          ),
          b.binaryExpression(
            'in',
            b.literal('writable'),
            b.identifier('desc')
          )
        ),
        b.blockStatement([
          b.returnStatement(
            b.memberExpression(
              b.identifier('desc'),
              b.identifier('value'),
              false
            )
          )
        ]),
        b.blockStatement([
          b.variableDeclaration(
            'var',
            [
              b.variableDeclarator(
                b.identifier('getter'),
                b.memberExpression(
                  b.identifier('desc'),
                  b.identifier('get'),
                  false
                )
              )
            ]
          ),
          b.ifStatement(
            b.binaryExpression(
              '===',
              b.identifier('getter'),
              b.unaryExpression(
                'void',
                b.literal(0),
                true
              )
            ),
            b.blockStatement([
              b.returnStatement(
                b.unaryExpression(
                  'void',
                  b.literal(0),
                  true
                )
              )
            ]),
            null
          ),
          b.returnStatement(
            b.callExpression(
              b.memberExpression(
                b.identifier('getter'),
                b.identifier('call'),
                false
              ),
              [b.identifier('receiver')]
            )
          )
        ])
      )
    )
  ]),
  false,
  false
)};