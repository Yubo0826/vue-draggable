import { defineComponent as A, ref as x, onMounted as y, onUpdated as L, h as s, TransitionGroup as v } from "vue";
const E = function(a, { slots: o, emit: c }) {
  const r = x(null);
  let d, u;
  y(() => {
    f();
  }), L(() => {
    console.log("onUpdated"), m();
  });
  function f() {
    var n;
    const t = (n = r.value) == null ? void 0 : n.children;
    for (let e = 0; e < t.length; e++)
      if (t[e].setAttribute("index", e.toString()), t[e].addEventListener("dragenter", h), a.handle) {
        let l = t[e].getElementsByClassName(
          a.handle
        );
        for (let i = 0; i < l.length; i++)
          l[i].setAttribute("index", e.toString()), l[i].setAttribute("draggable", "true"), l[i].addEventListener("dragstart", g);
      } else
        t[e].setAttribute("draggable", "true"), t[e].addEventListener("dragstart", g);
  }
  function m() {
    var n;
    const t = (n = r.value) == null ? void 0 : n.children;
    for (let e = 0; e < t.length; e++)
      if (t[e].setAttribute("index", e.toString()), a.handle) {
        let l = t[e].getElementsByClassName(
          a.handle
        );
        for (let i = 0; i < l.length; i++)
          l[i].setAttribute("index", e.toString());
      }
  }
  function g(t) {
    const n = t.target;
    n && (d = parseInt(n.getAttribute("index") || "0"));
  }
  function h(t) {
    console.log("dragEnter");
    const n = t.currentTarget;
    n && (u = parseInt(n.getAttribute("index") || "0")), d !== u && !n.classList.contains(`${a.transitionName}-move`) && b(d, u);
  }
  function b(t, n) {
    console.log("updatePostion: " + t + "到" + n);
    let e = [...a.modelValue];
    n > t ? (e.splice(n + 1, 0, e[t]), e.splice(t, 1)) : (e.splice(n, 0, e[t]), e.splice(t + 1, 1)), d = u, c("update:modelValue", e);
  }
  return () => {
    const t = a.modelValue.map((n) => o.default({
      element: n,
      key: n
    }));
    return a.transitionName ? s(
      a.tag,
      { ref: r },
      s(
        v,
        {
          name: a.transitionName || "fade"
        },
        () => t
      )
    ) : s(
      a.tag,
      { ref: r },
      a.modelValue.map((n) => o.default({
        element: n
      }))
    );
  };
}, N = {
  modelValue: {
    type: Array,
    default: () => []
  },
  tag: {
    type: String,
    default: "div"
  },
  handle: {
    type: String,
    required: !1
  },
  transitionName: {
    type: String,
    required: !1
  },
  // transitionData: {
  //   type: Object,
  //   default() {
  //     return {transition: false, name: '' }
  //   }
  // },
  move: {
    type: Function,
    required: !1
  }
}, p = A(
  E,
  {
    props: N,
    emits: ["update:modelValue"]
  }
);
export {
  p as default
};
