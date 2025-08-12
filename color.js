let color = [];
for(let i = 0; i<360; i++){
  color.push(`(50% 100 ${i}) ${i}deg`);
};

const conic = `conic-gradient(${color.join(",")})`;

(function(){
  let degree = 250;

  change_color.value = degree;
  const style = document.createElement("style");
  style.setAttribute("id", "palette");
  document.querySelector("head").appendChild(style);

  let f = buildPaletteDefault;
  document.querySelector("#change_color").addEventListener("input", function(){
    f(parseFloat(this.value));
  });
  
  function buildPaletteDefault(degree){
    const shift = (degree - 30) % 360;
    
    style.innerHTML = `html{
  --color-primary: 40%  50 ${degree};
  --color-on-primary: 100% 0 ${degree};
  --color-primary-container: 90%  20 ${degree};
  --color-on-primary-container: 30%  50 ${degree};

  --color-secondary: 40%  10 ${degree};
  --color-on-secondary: 100% 0 ${degree};
  --color-secondary-container: 90% 10 ${degree};
  --color-on-secondary-container: 30% 10 ${degree};

  --color-tertiary: 40%  15 ${shift};
  --color-on-tertiary: 100% 0 ${shift};
  --color-tertiary-container: 90%  15 ${shift};
  --color-on-tertiary-container: 30%  15 ${shift};

  --color-error: 40% 70 37;
  --color-on-error: 100% 0 37;
  --color-error-container: 90%  10   37;
  --color-on-error-container: 30%  60   37;

  --color-surface: 98% 5 ${degree};
  --color-on-surface: 10% 5 ${degree};
  --color-surface-variant: 90% 5 ${degree};
  --color-on-surface-variant: 30% 5 ${degree};
  --color-surface-container-highest: 90% 5 ${degree};
  --color-surface-container-high: 92% 5 ${degree};
  --color-surface-container: 94% 5 ${degree};
  --color-surface-container-low: 96% 5 ${degree};
  --color-surface-container-lowest: 100% 0 ${degree};
  --color-inverse-surface: 20% 5 ${degree};
  --color-inverse-on-surface: 95% 5 ${degree};

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
  --color-scrim: 0% 0 ${degree};
  --color-shadow: 0% 0 ${degree};
    }`;
  };

  function buildPaletteMedium(degree){
    const shift = (degree - 30) % 360;
    
    style.innerHTML = `html{
  --color-primary: 30%  50 ${degree};
  --color-on-primary: 100% 0 ${degree};
  --color-primary-container: 40% 15 ${degree};
  --color-on-primary-container: 100%  0 ${degree};

  --color-secondary: 30%  12  ${degree};
  --color-on-secondary: 100% 0 ${degree};
  --color-secondary-container: 40% 12 ${degree};
  --color-on-secondary-container: 100% 0 ${degree};

  --color-tertiary: 30%  20 ${shift};
  --color-on-tertiary: 100% 0 ${shift};
  --color-tertiary-container: 40%  20 ${shift};
  --color-on-tertiary-container: 100%  0 ${shift};

  --color-error: 30%  70   37;
  --color-on-error: 100% 0 37;
  --color-error-container: 40%  10   37;
  --color-on-error-container: 100%  0   37;

  --color-surface: 98% 5 ${degree};
  --color-on-surface: 0% 0 ${degree};
  --color-surface-variant: 90% 5 ${degree};
  --color-on-surface-variant: 20% 5 ${degree};
  --color-surface-container-highest: 90% 5 ${degree};
  --color-surface-container-high: 92% 5 ${degree};
  --color-surface-container: 94% 5 ${degree};
  --color-surface-container-low: 96% 5 ${degree};
  --color-surface-container-lowest: 100% 0 ${degree};
  --color-inverse-surface: 20% 5 ${degree};
  --color-inverse-on-surface: 100% 0 ${degree};

  --color-outline: 30% 5 ${degree};
  --color-outline-variant: 50% 5 ${degree};

  --color-primary-fixed: 40% 15 ${degree};
  --color-on-primary-fixed: 100% 0 ${degree};
  --color-primary-fixed-dim: 30% 15 ${degree};
  --color-primary-fixed-variant: 100% 0 ${degree};
  --color-on-inverse-primary: 80% 15 ${degree};

  --color-secondary-fixed: 40% 10 ${degree};
  --color-on-secondary-fixed: 100% 0 ${degree};
  --color-secondary-fixed-dim: 40% 10 ${degree};
  --color-secondary-fixed-variant: 100% 0 ${degree};

  --color-tertiary-fixed: 40% 15 ${shift};
  --color-on-tertiary-fixed: 100% 0 ${shift};
  --color-tertiary-fixed-dim: 30% 15 ${shift};
  --color-tertiary-fixed-variant: 100% 0 ${shift};

  --color-background: 98% 5 ${degree};
  --color-on-background: 0% 0 ${degree};
  --color-surface-bright: 98% 5 ${degree};
  --color-surface-dim: 87% 5 ${degree}; 
  --color-scrim: 0% 0 ${degree};
  --color-shadow: 0% 0 ${degree};
    }`;
  };

  function buildPaletteMore(degree){
    const shift = (degree - 30) % 360;
    
    style.innerHTML = `html{
  --color-primary: 20%  50 ${degree};
  --color-on-primary: 100% 0 ${degree};
  --color-primary-container: 30% 15 ${degree};
  --color-on-primary-container: 100%  0 ${degree};

  --color-secondary: 20% 12 ${degree};
  --color-on-secondary: 100% 0 ${degree};
  --color-secondary-container: 30% 12 ${degree};
  --color-on-secondary-container: 100% 0 ${degree};

  --color-tertiary: 20% 20 ${shift};
  --color-on-tertiary: 100% 0 ${shift};
  --color-tertiary-container: 30%  20 ${shift};
  --color-on-tertiary-container: 100%  0 ${shift};

  --color-error: 20% 70 37;
  --color-on-error: 100% 0 37;
  --color-error-container: 30% 10 37;
  --color-on-error-container: 100%  0   37;

  --color-surface: 98% 5 ${degree};
  --color-on-surface: 0% 0 ${degree};
  --color-surface-variant: 90% 5 ${degree};
  --color-on-surface-variant: 0% 0 ${degree};
  --color-surface-container-highest: 90% 5 ${degree};
  --color-surface-container-high: 92% 5 ${degree};
  --color-surface-container: 94% 5 ${degree};
  --color-surface-container-low: 96% 5 ${degree};
  --color-surface-container-lowest: 100% 0 ${degree};
  --color-inverse-surface: 20% 5 ${degree};
  --color-inverse-on-surface: 100% 0 ${degree};

  --color-outline: 20% 5 ${degree};
  --color-outline-variant: 30% 5 ${degree};

  --color-primary-fixed: 30% 15 ${degree};
  --color-on-primary-fixed: 100% 0 ${degree};
  --color-primary-fixed-dim: 20% 15 ${degree};
  --color-primary-fixed-variant: 100% 0 ${degree};
  --color-on-inverse-primary: 80% 15 ${degree};

  --color-secondary-fixed: 40% 10 ${degree};
  --color-on-secondary-fixed: 100% 0 ${degree};
  --color-secondary-fixed-dim: 40% 10 ${degree};
  --color-secondary-fixed-variant: 100% 0 ${degree};

  --color-tertiary-fixed: 30% 15 ${shift};
  --color-on-tertiary-fixed: 100% 0 ${shift};
  --color-tertiary-fixed-dim: 20% 15 ${shift};
  --color-tertiary-fixed-variant: 100% 0 ${shift};

  --color-background: 98% 5 ${degree};
  --color-on-background: 0% 0 ${degree};
  --color-surface-bright: 98% 5 ${degree};
  --color-surface-dim: 87% 5 ${degree}; 
  --color-scrim: 0% 0 ${degree};
  --color-shadow: 0% 0 ${degree};
    }`;
  };
  
  f(degree)
})();
