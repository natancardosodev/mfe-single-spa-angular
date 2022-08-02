import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UppercaseDirective } from './uppercase.directive';

describe('UppercaseDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let input: Array<DebugElement>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestComponent, UppercaseDirective]
        }).createComponent(TestComponent);
        fixture.detectChanges();
        input = fixture.debugElement.queryAll(By.directive(UppercaseDirective));
    });

    it('Deve ter um input com a diretiva', () => {
        expect(input.length).toBe(1);
    });

    it('Deve alterar o valor do input para uppercase', () => {
        const element = input[0].nativeElement;
        element.value = 'valor';
        element.dispatchEvent(new Event('input', { bubbles: true }));
        expect(element.value).toBe('VALOR');
    });
});

@Component({
    template: `<input [uppercase] type="text" name="teste" id="teste" />
        <input type="text" name="teste2" id="teste2" />`
})
class TestComponent {}
