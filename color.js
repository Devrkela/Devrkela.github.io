let color = [];
for(let i = 0; i<360; i++){
  color.push(`(50% 100 ${i}) ${i}deg`);
};

const conic = `conic-gradient(${color.join(",")})`;

(function(){
  let degree = 100;
  
  const style = document.createElement("style");
  style.setAttribute("id", "palette");
  document.querySelector("head").appendChild(style);

  document.querySelector("#change_color").addEventListener("input", function(){
    buildPalette(parseFloat(this.value));
  });
  
  function buildPalette(degree){
    const shift = (degree + 30) % 360;
    
    style.innerHTML = `html{
  --color-primary: 40%  50 ${degree};
  --color-on-primary: 100% 15 ${degree};
  --color-primary-container: 90%  15 ${degree};
  --color-on-primary-container: 30%  50 ${degree};

  --color-secondary: 40%  10 ${degree};
  --color-on-secondary: 100% 10 ${degree};
  --color-secondary-container: 90%  10 ${degree};
  --color-on-secondary-container: 30%  10 ${degree};

  --color-tertiary: 40%  15 ${shift};
  --color-on-tertiary: 100% 15 ${shift};
  --color-tertiary-container: 90%  15 ${shift};
  --color-on_tertiary_container: 30%  15 ${shift};

  --color-error: 40%  70   37;
  --color-on-error: 100% 50   37;
  --color-error-container: 90%  10   37;
  --color-on_error_container: 30%  60   37;

  --color-surface: 98%  5 ${degree};
  --color-on-surface: 10%  5 ${degree};
  --color-surface-variant: 90%  5 ${degree};
  --color-on-surface-variant: 30%  5 ${degree};
  --color-surface-container-highest: 90%  5 ${degree};
  --color-surface-container-high: 92%  5   ${degree};
  --color-surface-container: 94%  5   ${degree};
  --color-surface-container-low: 96%  5   ${degree};
  --color-surface-container-lowest: 100% 5   ${degree};
  --color-inverse-surface: 20%  5   ${degree};
  --color-inverse-on-surface: 95%  5   ${degree};

  --color-outline: 50% 5 ${degree};
  --color-outline-variant: 80% 5 ${degree};

  --color-primary-fixed: 90% 15 ${degree};
  --color-on-primary-fixed: 10% 50 ${degree};
  --color-primary-fixed-dim: 80% 15 ${degree};
  --color-primary-fixed-variant: 30% 50 ${degree};
  --color-on-inverse-primary: 80% 15 ${degree};

  --color-secondary-fixed: 90% 10 ${degree};
  --color-on-secondary-fixed: 10% 10 ${degree};
  --color-secondary-fixed-dim: 80% 10 ${degree};
  --color-secondary-fixed-variant: 30% 10 ${degree};

  --color-tertiary-fixed: 90% 15 ${shift};
  --color-on-tertiary-fixed: 10% 15 ${shift};
  --color-tertiary-fixed-dim: 80% 15 ${shift};
  --color-tertiary-fixed-variant: 30% 15 ${shift};

  --color-background: 98% 5 ${degree};
  --color-on-background: 10% 5 ${degree};
  --color-surface-bright: 98% 5 ${degree};
  --color-surface-dim: 87% 5 ${degree}; 
  --color-scrim: 00% 5 ${degree};
  --color-shadow: 00% 5 ${degree};
    }`;
  };

  buildPalette(degree)
})();
