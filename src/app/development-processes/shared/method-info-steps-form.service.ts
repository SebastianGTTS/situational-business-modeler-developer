import { Injectable } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { ModuleService } from '../../development-process-registry/module-api/module.service';
import { StepDecision } from '../../development-process-registry/module-api/module-method';
import {
  ExecutionStep,
  isMethodExecutionStep,
} from '../../development-process-registry/development-method/execution-step';

@Injectable({
  providedIn: 'root',
})
export class MethodInfoStepsFormService {
  constructor(
    private fb: UntypedFormBuilder,
    private moduleService: ModuleService
  ) {}

  createForm(
    executionSteps: ExecutionStep[],
    stepDecisions: (StepDecision | undefined)[]
  ): UntypedFormArray {
    return this.fb.array(
      stepDecisions.map((step, index) =>
        this.createStepDecisionForm(executionSteps[index], step)
      )
    );
  }

  createStepDecisionForm(
    executionStep: ExecutionStep,
    stepDecision: StepDecision | undefined
  ): UntypedFormGroup | undefined {
    if (!isMethodExecutionStep(executionStep)) {
      return undefined;
    }
    const method = this.moduleService.getModuleMethod(
      executionStep.module,
      executionStep.method
    );
    if (method != null && method.createDecisionConfigurationForm != null) {
      return method.createDecisionConfigurationForm(stepDecision);
    }
    return undefined;
  }

  getStepDecisions(form: StepDecision[]): StepDecision[] {
    return form;
  }
}
