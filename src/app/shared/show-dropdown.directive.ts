import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[showCollapse]'
})
export class ShowCollapse {

  private readonly className = 'toggle';

  @Input() docListen: boolean = false;
  @Input() targetElementId: string;

  constructor(private el: ElementRef) { }

  @HostListener('click')
  toggleShow(){
    //console.debug(this.el.nativeElement.getAttribute('data-target'));
    let target = this.getTargetElement();
    target.classList.contains(this.className) ? target.classList.remove(this.className) : target.classList.add(this.className);
  }

  private getTargetElement(){
    let targetName = this.targetElementId ? this.targetElementId : this.el.nativeElement.getAttribute('data-target');
    let target = <HTMLHtmlElement> document.getElementById(targetName.split('#')[1]);

    return target;
  }

  @HostListener('document:click', ['$event'])
  private documentOnClick(event){
    if(!this.docListen || !this.targetElementId) return;
    if(!this.el.nativeElement.contains(event.target)){
      // console.debug('docOnClick event', event.target, 'this element', this.el.nativeElement);
      let target = this.getTargetElement();
      target.classList.remove(this.className);
    }
  }
}
