module.exports=[3108,a=>{"use strict";var b=a.i(87924),c=a.i(72131);a.s(["default",0,()=>{let[a,d]=(0,c.useState)(null),[e,f]=(0,c.useState)(0),[g,h]=(0,c.useState)(0),[i,j]=(0,c.useState)(0),[k,l]=(0,c.useState)(100),[m,n]=(0,c.useState)(100),[o,p]=(0,c.useState)(100),[q,r]=(0,c.useState)(0),[s,t]=(0,c.useState)(0),[u,v]=(0,c.useState)(100),w=(0,c.useRef)(null),x=(0,c.useRef)(null),y=(0,c.useRef)(null),z=`
    grayscale(${e}%)
    sepia(${g}%)
    blur(${i}px)
    brightness(${k}%)
    contrast(${m}%)
    saturate(${o}%)
    hue-rotate(${q}deg)
    invert(${s}%)
    opacity(${u}%)
  `;return(0,b.jsxs)("div",{className:"max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg border",children:[(0,b.jsx)("h1",{className:"text-3xl font-bold text-center mb-6",children:"Image Filters & Effects"}),!a&&(0,b.jsx)("input",{type:"file",ref:w,accept:"image/*",onChange:a=>{let b=a.target.files?.[0];b&&d(URL.createObjectURL(b))},className:"p-3 border rounded-md w-full"}),a&&(0,b.jsx)("button",{onClick:()=>{d(null),w.current.value=""},className:"mb-3 px-3 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300",children:"Choose New Image"}),a&&(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6",children:[(0,b.jsxs)("div",{className:"p-4 bg-gray-50 rounded-xl border space-y-4",children:[(0,b.jsx)("h2",{className:"text-xl font-semibold mb-2",children:"Filter Controls"}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("p",{children:["Grayscale (",e,"%)"]}),(0,b.jsx)("input",{type:"range",min:"0",max:"100",value:e,onChange:a=>f(Number(a.target.value)),className:"w-full"})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("p",{children:["Sepia (",g,"%)"]}),(0,b.jsx)("input",{type:"range",min:"0",max:"100",value:g,onChange:a=>h(Number(a.target.value)),className:"w-full"})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("p",{children:["Blur (",i,"px)"]}),(0,b.jsx)("input",{type:"range",min:"0",max:"10",value:i,onChange:a=>j(Number(a.target.value)),className:"w-full"})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("p",{children:["Brightness (",k,"%)"]}),(0,b.jsx)("input",{type:"range",min:"0",max:"200",value:k,onChange:a=>l(Number(a.target.value)),className:"w-full"})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("p",{children:["Contrast (",m,"%)"]}),(0,b.jsx)("input",{type:"range",min:"0",max:"200",value:m,onChange:a=>n(Number(a.target.value)),className:"w-full"})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("p",{children:["Saturation (",o,"%)"]}),(0,b.jsx)("input",{type:"range",min:"0",max:"200",value:o,onChange:a=>p(Number(a.target.value)),className:"w-full"})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("p",{children:["Hue Rotate (",q,"°)"]}),(0,b.jsx)("input",{type:"range",min:"0",max:"360",value:q,onChange:a=>r(Number(a.target.value)),className:"w-full"})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("p",{children:["Invert (",s,"%)"]}),(0,b.jsx)("input",{type:"range",min:"0",max:"100",value:s,onChange:a=>t(Number(a.target.value)),className:"w-full"})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("p",{children:["Opacity (",u,"%)"]}),(0,b.jsx)("input",{type:"range",min:"10",max:"100",value:u,onChange:a=>v(Number(a.target.value)),className:"w-full"})]}),(0,b.jsx)("button",{onClick:()=>{f(0),h(0),j(0),l(100),n(100),p(100),r(0),t(0),v(100)},className:"mt-3 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600",children:"Reset Filters"})]}),(0,b.jsx)("div",{className:"col-span-2",children:(0,b.jsx)("div",{className:"w-full bg-gray-100 p-3 rounded-lg border flex justify-center",children:(0,b.jsx)("img",{ref:y,src:a,className:"max-w-full rounded-lg shadow-md",style:{filter:z}})})})]}),a&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("canvas",{ref:x,className:"hidden"}),(0,b.jsx)("button",{onClick:()=>{let a=x.current,b=y.current;if(!a||!b)return;a.width=b.naturalWidth,a.height=b.naturalHeight;let c=a.getContext("2d");c.filter=`
      grayscale(${e}%)
      sepia(${g}%)
      blur(${i}px)
      brightness(${k}%)
      contrast(${m}%)
      saturate(${o}%)
      hue-rotate(${q}deg)
      invert(${s}%)
      opacity(${u}%)
    `,c.drawImage(b,0,0,a.width,a.height);let d=document.createElement("a");d.download="filtered-image.png",d.href=a.toDataURL(),d.click()},className:"mt-6 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700",children:"Download Image"})]})]})}])}];

//# sourceMappingURL=app_tools_imageTools_filters-effects_page_tsx_6dcab2f6._.js.map