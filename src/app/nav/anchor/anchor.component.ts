import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LetterWiggleDirective } from '../../directives/letter-wiggle.directive';

@Component({
  selector: 'app-anchor',
  standalone: true,
  imports: [LetterWiggleDirective],
  templateUrl: './anchor.component.html',
  styleUrl: './anchor.component.css'
})
export class AnchorComponent {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {} // I added this to check browser status

  /* This code comes from code pen. I changed it slightly to work with Typescript and add a TON of comments so I could understand how it works
     Here is the link: https://codepen.io/jh3y/pen/GRapZqO.
     It seems that a good piece of this code is for if the browser does not support anchor posistioning. In fact I just tested it and as long
     as the browser supports anchoring, this code is not needed...
  */
  ngAfterViewInit(){
    if (isPlatformBrowser(this.platformId)) { // I added this as well to check is the a browser is being used, this is mainly for errors when the code is being executed server-side (such as during the bild process - vite was causing errors)
    /* The code below evaluates to true or false based off of wether or not anchorName can be found as an attribute of document.documentElement.style */
    const supportsAnchorPos = "anchorName" in document.documentElement.style;

  /* The code below is a higher order function. When sync(nav,Anchor) is called it returns the logic inside of it. Later in the code uses
     const calibrate = sync(nav, anchors) and then calibrate is called will calibrate() and the function inside of sync is ran. It seems
     it is written this way to avoid typing sync(nav,anchors)() or sync(nav,anchors) multiple times and instead typing calibrate() or calibrate.
     Sync could be a regular function and then called as sync(nav,anchor) later rather than setting
     calibrate to it and then callling calibrate(). currrently sync can also be called as sync(nav,anchors)(). This is mainly useful for passing
     a function as a parameter like for an event listener (EX: onClick(calibrate)).

  */
    const sync = (nav: HTMLElement, anchors: NodeListOf<Element>) => () => { // Anchors most likely represent the list of <a> elements inside the nav html element
      for (let i = 0; i < anchors.length; i++) { // iterates through the <a> anchors
        anchors[i].setAttribute('view-transition-name', `item-${i + 1}`); // This adds an attribute name to the element so that it can be referenced later
        if (!supportsAnchorPos) { // Check if browser supports anchor positioning. If it doesn't, the code below executes
          /* The code below seems to manually set css properties for if the browser doesn't support anchor posistioning.
             I am not entirely sure what exactly this code is doing as my browser supports anchor positioning and I have
             not tested this code on a browser that does not support anchor posisitioning. */
          const bounds = anchors[i].getBoundingClientRect(); // returns DOM rectangle obeject which cotains attributes such as left, top, width, and height.
          nav.style.setProperty(`--item-${i + 1}-x`, `${bounds.left}px`);
          nav.style.setProperty(`--item-${i + 1}-y`, `${bounds.top}px`);
          nav.style.setProperty(`--item-${i + 1}-width`, `${bounds.width}px`);
          nav.style.setProperty(`--item-${i + 1}-height`, `${bounds.height}px`);
        }
      }
    };



    const nav = document.querySelector('[data-magnetic]') as HTMLElement; // Selects first item in the DOM with the attribute of "data-magnetic" and asserts HTMLElement type
    const anchors = nav.querySelectorAll('a'); // Returns a NodeListOf<Elements> of <a> tags within the nav element. The anchors are the <a> tags
    const calibrate = sync(nav, anchors); // This will allow the higher order function the be called later as calibrate() or passed as a parameter as "calibrate"

    if (!supportsAnchorPos) { // Another if statement for if the browser doesn't support anchor posistioning
      document.documentElement.setAttribute('data-no-anchor', 'true');
      calibrate();
      window.addEventListener('resize', calibrate);
    }

    const falloff = (index: number) => () => {
      if (!supportsAnchorPos) {
        nav.style.setProperty('--item-active-x', `var(--item-${index + 1}-x)`);
        nav.style.setProperty('--item-active-y', `var(--item-${index + 1}-y)`);
        nav.style.setProperty('--item-active-width', `var(--item-${index + 1}-width)`);
        nav.style.setProperty('--item-active-height', `var(--item-${index + 1}-height)`);
      }
    };

    for (let i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('pointerenter', falloff(i));
    }

    const deactivate = async () => {
      /* Below an if statement checks is the browser supports anchor posisiting. If the browser does not support anchering the code below will run */
      if (!supportsAnchorPos) {
        // Below retrieves all of the active animations on the document and stores them in transistions
        const transitions = document.getAnimations();
        // Below checks to see if there are any transistions
        if (transitions.length) {
          // Below fade is set equal to any animation objects found with transistions that meet the specified criteria
          const fade = transitions.find(animationObject => {
            // Notes for me to reference later - 
            // "effect?.target" allows the checking for target without errors (if null or undefined)
            // .some is an array method that checks if at least one element in an array satisfies a condition (returns true or false)

            
            /* Below, Typescript assertion to tell typescripts compiler that I am sure the Animation Element is a KeyframeEffect.
              Oject.effect is a keyframeEffect. animationObject is an element from an array of transistions which is likely of type 
              Animation.effect refers to the effect property of an Animation instance. The effect could be different types depending
              on the type of animation (KeyframeEffecct, AnimationEffect) which is why "as KeyframeEffect" is asserted and
              telling the Typescript compiler that we know animationObject.effect IS a key frame. This is useful for 
              "type saftey." There could be methods that are accessible on multiple types (.effect could be on KeyframeEffect and
              AnimationEffect), asserting the type allows the method/data to be accessed on the correct type. This can help avoid
              errors.
            */
            const effect = animationObject.effect as KeyframeEffect; 
            /* Below, first, effect?.target checks if effect exists, then if so, accesses target. Target is refering to the HTML element
               that the animation is effecting. This is compared to nav.fistElementChild to check if the Element affected by the animation 
               is the first element in the navbar. This needs to be checked because of a reason I am unsure of, however this code is only 
               supposed to be ran if the browser doesn't support anchering, mine does so this may tie into an effect I have yet to see.
                */
            return effect?.target === nav.firstElementChild && effect.getKeyframes().some(keyframe => 'opacity' in keyframe); 
          });
          // Below, checks if any animation objects were found within fade that met the criteria specified inside the arrow funcion
          if (fade) {
            /* below fade.finsihed is iside of an array in case more conditions need to be met in the future
               Promise.allSettled is like promise.all, however promise.all fails if any conditions within an
               array are rejected whereas promise.allSettled WAITS for ALL promises to settle within
               the array (wether or not some get rejected). Bassically this code is saying wait until the fade 
               animation is finished.

            */
            await Promise.allSettled([fade.finished]);
            /* The code below removes the custom css properties (variables) from the navbar */
            nav.style.removeProperty('--item-active-x');
            nav.style.removeProperty('--item-active-y');
            nav.style.removeProperty('--item-active-width');
            nav.style.removeProperty('--item-active-height');
          }
        }
      }
    };

    nav.addEventListener('pointerleave', deactivate);
    nav.addEventListener('blur', deactivate);

    const orientator = document.querySelector('.direction-handler') as HTMLElement;
    const orient = () => {
      orientator.setAttribute('aria-pressed', orientator.matches('[aria-pressed=false') ? 'true' : 'false');
      calibrate();
    };

    const changeOrientation = () => {
      document.documentElement.setAttribute('data-flipUi', 'true');
      if (!('startViewTransition' in document)) return orient();
      const transition = (document as any).startViewTransition(orient);
      transition.finished.finally(() => {
        document.documentElement.removeAttribute('data-flipUi');
      });
    };

    orientator.addEventListener('click', changeOrientation);
    calibrate();

    const toggle = document.querySelector('button.theme') as HTMLElement;
    const switchTheme = () => {
      const isDark = toggle.matches('[aria-pressed=true]') ? false : true;
      toggle.setAttribute('aria-pressed', isDark.toString());
      document.documentElement.className = isDark ? 'light' : 'dark';
    };

    const handleToggle = () => {
      if (!('startViewTransition' in document)) {
        console.info('Hey! Try this out in Chrome 111+');
        switchTheme();
      } else {
        (document as any).startViewTransition(switchTheme);
      }
    };

    toggle.addEventListener('click', handleToggle);
  }
}
}
