const h = require('snabbdom/h').default;
import omit from 'lodash/omit';

export const changeOpenedNodeName = ({ctx, newName}) => {
  const newCtx = {
    ...ctx,
    loadedGraph: {
      ...ctx.loadedGraph,
      [ctx.openedNode]: {
        ...ctx.loadedGraph[ctx.openedNode],
        name: newName
      }
    }
  };
  return {ctx: newCtx, arrow: 'changedNodeName'};
};

export const removeNode = data => ({ctx}) => {
  data.cy.$('*').remove();
  const newCtx = {
    ...ctx,
    loadedGraph: omit(ctx.loadedGraph, [ctx.openedNode])
  };
  return {ctx: newCtx, arrow: 'removedNode'};
};

export const openedNodeName = ctx => 
  (ctx.loadedGraph[ctx.openedNode] || {}).name || "";

export const removeNodeButton = ({thisModel}) => 
  h('input', {
    props: {type: 'button', value: 'remove'},
    on: {click: e => thisModel.removeNode()}
  });

export const nodeNameInput = ({thisModel, ctx}) =>
  h('input', {
    props: {type: 'text', value: openedNodeName(ctx)},
    on: {input: e => thisModel.changeOpenedNodeName({
      newName: e.target.value
    })}
  });