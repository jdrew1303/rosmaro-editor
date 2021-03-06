import {updateCtxBasedOnView, runLayout} from './utils';
import h from './html';

const defaultName = 'Entry point';

const selectedEntryPointName = ({data, ctx}) => {
  return entryPoint({data, ctx}).data().name || defaultName;
};

const entryPoint = ({data, ctx}) => 
  data.cy.$(`node[id='${ctx.selectedEntryPointId}']`);

export default (data) => ({

  removeSelectedEntryPoint: ({ctx}) => {
    entryPoint({data, ctx}).remove();
    data.eh.hide();
    return {
      arrow: 'removed entry point',
      ctx: updateCtxBasedOnView(ctx, data.cy)
    };
  },

  typeSelectedEntryPointName: ({ctx, name}) => {
    const p = entryPoint({data, ctx});
    p.data('name', name);
    p.data('displayName', " : " + name);
    return {
      arrow: 'typed entry point name',
      ctx: updateCtxBasedOnView(ctx, data.cy)
    };
  },

  render: ({ctx, thisModel}) => [

    h('input', {
      props: {type: 'text', value: selectedEntryPointName({data, ctx})},
      on: {input: e => thisModel.typeSelectedEntryPointName({
        name: e.target.value || defaultName
      })}
    }),

    h('input', {
      props: {type: 'button', value: 'remove'},
      on: {click: e => thisModel.removeSelectedEntryPoint()}
    }),

  ]

});