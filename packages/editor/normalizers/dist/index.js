'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');
var plateCore = require('@udecode/plate-core');
var slate = require('slate');

const withNormalizeTypes = ({
  rules,
  onError
}) => editor => {
  const {
    normalizeNode
  } = editor;

  editor.normalizeNode = ([currentNode, currentPath]) => {
    if (!currentPath.length) {
      const endCurrentNormalizationPass = rules.some(({
        strictType,
        type,
        path
      }) => {
        const node = plateCommon.getNode(editor, path);

        if (node) {
          if (strictType && plateCore.isElement(node) && node.type !== strictType) {
            plateCommon.setNodes(editor, {
              type: strictType
            }, {
              at: path
            });
            return true;
          }
        } else {
          try {
            plateCommon.insertNodes(editor, {
              type: strictType !== null && strictType !== void 0 ? strictType : type,
              children: [{
                text: ''
              }]
            }, {
              at: path
            });
            return true;
          } catch (err) {
            onError === null || onError === void 0 ? void 0 : onError(err);
          }
        }

        return false;
      });

      if (endCurrentNormalizationPass) {
        return;
      }
    }

    return normalizeNode([currentNode, currentPath]);
  };

  return editor;
};
/**
 * @see {@link withNormalizeTypes}
 */

const createNormalizeTypesPlugin = plateCore.getPlatePluginWithOverrides(withNormalizeTypes);

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray_1(value) ? value : [value];
}

var castArray_1 = castArray;

/**
 * Remove nodes with empty text.
 */

const withRemoveEmptyNodes = options => editor => {
  const types = castArray_1(options.type);
  const {
    normalizeNode
  } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (plateCore.isElement(node) && node.type && types.includes(node.type) && slate.Node.string(node) === '') {
      slate.Transforms.removeNodes(editor, {
        at: path
      });
      return;
    }

    normalizeNode([node, path]);
  };

  return editor;
};
/**
 * @see {@link withRemoveEmptyNodes}
 */

const createRemoveEmptyNodesPlugin = plateCore.getPlatePluginWithOverrides(withRemoveEmptyNodes);

exports.createNormalizeTypesPlugin = createNormalizeTypesPlugin;
exports.createRemoveEmptyNodesPlugin = createRemoveEmptyNodesPlugin;
exports.withNormalizeTypes = withNormalizeTypes;
exports.withRemoveEmptyNodes = withRemoveEmptyNodes;
//# sourceMappingURL=index.js.map
