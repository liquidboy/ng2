import {
  inject,
  TestComponentBuilder
} from 'angular2/testing';
import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  beforeEach,
} from '../../core/facade/testing';
import {Component} from 'angular2/core';
import {By} from 'angular2/platform/browser';

import {WelcomeComponent} from './welcome.component';


export function main() {
    describe('welcome', () => {

    });
}


/** Test component that contains an MdButton. */
@Component({
    selector: 'test-app',
    template: `
    <jf-welcome></jf-welcome>
  `,
    directives: [WelcomeComponent]
})
class TestApp {
    
}
