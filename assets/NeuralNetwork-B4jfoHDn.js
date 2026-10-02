import{r as l,j as s,C as Y,u as X,a as W,b as J,G as K,M as Q}from"./index-CpRsblVK.js";import{e as N,a4 as O,w as _,f as Z,au as U,ap as $,h as q,ab as tt}from"./three-BzjJDAVh.js";import"./react-B8yqMBYu.js";import"./gsap-xgxdCp6f.js";const et="/models/aarok-robot.glb";function ot({scrollProgress:b}){const f=l.useRef(null),v=l.useRef(0),h=J(K,et,i=>{i.setMeshoptDecoder(Q)}).scene,j=l.useMemo(()=>{const i=h.clone(!0),m=new $().setFromObject(i),x=m.getCenter(new q),P=m.getSize(new q),D=Math.max(P.x,P.y,P.z)||1;i.position.sub(x);const S=new tt;return S.add(i),S.scale.setScalar(3.6/D),i.traverse(y=>{const n=y;if(n.isMesh){n.castShadow=!1,n.receiveShadow=!1;const o=n.material;o&&"metalness"in o&&(o.metalness=Math.min(1,(o.metalness??.5)+.2),o.roughness=Math.max(.15,(o.roughness??.5)-.1),o.envMapIntensity=1.2)}}),S},[h]);return W((i,m)=>{if(!f.current)return;const x=i.clock.elapsedTime;v.current+=m*.25,f.current.rotation.y=v.current+b*Math.PI*6,f.current.rotation.x=Math.sin(x*.35)*.14+b*.6,f.current.rotation.z=Math.cos(x*.25)*.06,f.current.position.y=Math.sin(x*.7)*.22}),s.jsx("primitive",{ref:f,object:j})}const g=280,H=2.4,st=`
  attribute float particleSize;
  attribute vec3 particleColor;

  varying vec3  vColor;
  varying float vPulse;

  uniform float uTime;

  void main() {
    vColor = particleColor;

    float pulse = sin(uTime * 1.6 + position.x * 0.4 + position.y * 0.6 + position.z * 0.5) * 0.28 + 0.72;
    vPulse = pulse;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = particleSize * pulse * (380.0 / -mvPosition.z);
    gl_Position  = projectionMatrix * mvPosition;
  }
`,nt=`
  varying vec3  vColor;
  varying float vPulse;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float core = smoothstep(0.5, 0.05, dist);
    float halo = smoothstep(0.5, 0.20, dist) * 0.45;
    float alpha = (core + halo) * vPulse * 0.88;

    vec3 glow = vColor + vec3(halo * 0.4);
    gl_FragColor = vec4(glow, alpha);
  }
`;function rt({scrollProgress:b,mousePosition:f}){const v=l.useRef(null),E=l.useRef(null),h=l.useRef(null),{viewport:j}=X(),[i,m,x,P]=l.useMemo(()=>{const n=new Float32Array(g*3),o=new Float32Array(g*3),C=new Float32Array(g*3),F=new Float32Array(g),t=new N("#00f5ff"),L=new N("#a855f7"),B=new N("#3b82f6");for(let A=0;A<g;A++){const a=A*3,w=Math.random()*Math.PI*2,R=Math.acos(2*Math.random()-1),M=2.5+Math.random()*5.5;n[a]=M*Math.sin(R)*Math.cos(w),n[a+1]=M*Math.sin(R)*Math.sin(w),n[a+2]=M*Math.cos(R),o[a]=(Math.random()-.5)*.014,o[a+1]=(Math.random()-.5)*.014,o[a+2]=(Math.random()-.5)*.014;const c=(n[a+1]+8)/16,e=Math.random();let r;e<.55?r=t.clone().lerp(L,c):e<.8?r=L.clone().lerp(B,c):r=B.clone().lerp(t,1-c),C[a]=r.r,C[a+1]=r.g,C[a+2]=r.b,F[A]=Math.random()*1.8+.5}return[n,o,C,F]},[]),D=l.useMemo(()=>{const n=new O;return n.setAttribute("position",new _(i.slice(),3)),n.setAttribute("particleColor",new _(x.slice(),3)),n.setAttribute("particleSize",new _(P,1)),n},[i,x,P]),S=l.useMemo(()=>new Z({vertexShader:st,fragmentShader:nt,uniforms:{uTime:{value:0}},transparent:!0,blending:U,depthWrite:!1}),[]),y=l.useMemo(()=>{const n=g*22,o=new O;return o.setAttribute("position",new _(new Float32Array(n*6),3)),o.setAttribute("color",new _(new Float32Array(n*6),3)),o.setDrawRange(0,0),o},[]);return W(n=>{if(!v.current||!E.current)return;const o=n.clock.elapsedTime;S.uniforms.uTime.value=o;const C=v.current.geometry.attributes.position,F=v.current.geometry.attributes.particleColor,t=C.array,L=F.array,B=new N("#00f5ff"),A=new N("#a855f7");for(let c=0;c<g;c++){const e=c*3;t[e]+=m[e]+Math.sin(o*.45+c*.08)*.004,t[e+1]+=m[e+1]+Math.cos(o*.28+c*.09)*.004,t[e+2]+=m[e+2]+Math.sin(o*.38+c*.07)*.004;const r=f.x*j.width*.5-t[e],d=f.y*j.height*.5-t[e+1],G=Math.sqrt(r*r+d*d);if(G<4.5){const u=(4.5-G)/4.5*.55;t[e]+=r*u*.012,t[e+1]+=d*u*.012}const I=Math.sqrt(t[e]**2+t[e+1]**2+t[e+2]**2);if(I>9.5){const u=9.5/I;t[e]*=u,t[e+1]*=u,t[e+2]*=u}const k=((t[e+1]+9.5)/19+Math.sin(o*.15+c*.04)*.2+1)%1,T=B.clone().lerp(A,k);L[e]=T.r,L[e+1]=T.g,L[e+2]=T.b}C.needsUpdate=!0,F.needsUpdate=!0;const a=y.attributes.position.array,w=y.attributes.color.array,R=g*22;let M=0;for(let c=0;c<g&&M<R;c++)for(let e=c+1;e<g&&M<R;e++){const r=c*3,d=e*3,G=t[r]-t[d],I=t[r+1]-t[d+1],k=t[r+2]-t[d+2],T=Math.sqrt(G*G+I*I+k*k);if(T<H){const u=(1-T/H)*.45,p=M*6;a[p]=t[r],a[p+1]=t[r+1],a[p+2]=t[r+2],a[p+3]=t[d],a[p+4]=t[d+1],a[p+5]=t[d+2];const V=((t[r+1]+t[d+1])/2+9.5)/19,z=B.clone().lerp(A,V);w[p]=z.r*u,w[p+1]=z.g*u,w[p+2]=z.b*u,w[p+3]=z.r*u,w[p+4]=z.g*u,w[p+5]=z.b*u,M++}}y.setDrawRange(0,M*2),y.attributes.position.needsUpdate=!0,y.attributes.color.needsUpdate=!0,h.current&&(h.current.rotation.y=o*.07+b*Math.PI*2,h.current.rotation.x=Math.sin(o*.05)*.12)}),s.jsxs("group",{ref:h,children:[s.jsx("points",{ref:v,geometry:D,material:S}),s.jsx("lineSegments",{ref:E,geometry:y,children:s.jsx("lineBasicMaterial",{vertexColors:!0,transparent:!0,opacity:1,blending:U,depthWrite:!1})}),s.jsxs("mesh",{rotation:[.4,0,.2],children:[s.jsx("torusGeometry",{args:[4.5,.25,8,120]}),s.jsx("meshBasicMaterial",{color:"#00f5ff",wireframe:!0,transparent:!0,opacity:.045})]}),s.jsxs("mesh",{rotation:[Math.PI/2.5,.3,0],children:[s.jsx("torusGeometry",{args:[2.8,.18,6,80]}),s.jsx("meshBasicMaterial",{color:"#a855f7",wireframe:!0,transparent:!0,opacity:.04})]}),s.jsx(l.Suspense,{fallback:null,children:s.jsx(ot,{scrollProgress:b})})]})}function ut(){const[b,f]=l.useState(0),[v,E]=l.useState({x:0,y:0});return l.useEffect(()=>{const h=()=>{const i=window.scrollY,m=document.documentElement.scrollHeight-window.innerHeight;f(m>0?i/m:0)},j=i=>E({x:i.clientX/window.innerWidth*2-1,y:-(i.clientY/window.innerHeight)*2+1});return window.addEventListener("scroll",h,{passive:!0}),window.addEventListener("mousemove",j,{passive:!0}),()=>{window.removeEventListener("scroll",h),window.removeEventListener("mousemove",j)}},[]),s.jsx("div",{className:"three-canvas",children:s.jsxs(Y,{camera:{position:[0,0,13],fov:58},gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},dpr:[1,2],children:[s.jsx("color",{attach:"background",args:["#000000"]}),s.jsx("fog",{attach:"fog",args:["#000000",14,30]}),s.jsx("ambientLight",{intensity:.35}),s.jsx("directionalLight",{position:[6,8,6],intensity:1.5,color:"#ffffff"}),s.jsx("pointLight",{position:[-6,-2,4],intensity:40,distance:22,color:"#00f5ff"}),s.jsx("pointLight",{position:[5,3,-5],intensity:35,distance:22,color:"#a855f7"}),s.jsx(rt,{scrollProgress:b,mousePosition:v})]})})}export{ut as default};
