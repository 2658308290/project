export function renderTooltipHeader (h, {column}) {
  return h('el-tooltip', {
    props: {
      effect: 'dark',
      content: column.label,
      placement: 'top'
    }
  }, [
    h('span',
      {
        style: {'white-space': 'nowrap', 'text-overflow': 'ellipsis', 'overflow': 'hidden'}
      },
      column.label)
  ])
}
