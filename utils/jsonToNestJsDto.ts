// utils/jsonToNestJsDto.ts
import { camelCase, snakeCase, kebabCase, pascalCase, constantCase } from 'change-case';

export type CaseOption = 'camelCase' | 'snake_case' | 'kebab-case' | 'PascalCase' | 'CONSTANT_CASE';


interface ConvertOptions {
  addClassValidators?: boolean;
  addSwaggerAnnotations?: boolean;
  caseOption?: CaseOption;
}

export class JsonToNestJsDtoService {
  convert(
    jsonObject: Record<string, any>,
    className: string,
    options: ConvertOptions = {}
  ): string {
    let classStrings: string[] = [];
    let generatedClasses: Set<string> = new Set();
    this.generateClass(jsonObject, className, classStrings, options, generatedClasses);
    return classStrings.join('\n');
  }

  private generateClass(
    jsonObject: Record<string, any>,
    className: string,
    classStrings: string[],
    options: ConvertOptions,
    generatedClasses: Set<string>
  ) {
    if (generatedClasses.has(className)) return;
  
    let classString = `export class ${className} {\n`;
  
    for (const [key, value] of Object.entries(jsonObject)) {
      const isOptional = value === null;
      const transformedKey = this.transformKey(key, options.caseOption);
  
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        const nestedClassName = this.capitalizeFirstLetter(transformedKey);
        this.generateClass(value, nestedClassName, classStrings, options, generatedClasses);
        if (options.addSwaggerAnnotations) {
          classString += `  @ApiProperty({ type: () => ${nestedClassName} })\n`;
        }
        if (options.addClassValidators) {
          classString += `  @ValidateNested()\n  @Type(() => ${nestedClassName})\n`;
        }
        classString += `  ${transformedKey}${isOptional ? '?' : ''}: ${nestedClassName};\n\n`;
      } else {
        if (options.addSwaggerAnnotations) {
          const type = this.getSwaggerType(value);
          const example = value !== null ? `, example: ${JSON.stringify(value)}` : '';
          classString += `  ${isOptional ? '@ApiPropertyOptional({})' : `@ApiProperty({ type: '${type}'${example} })`}\n`;
        }
        if (options.addClassValidators) {
          classString += `  ${isOptional ? '@IsOptional()\n' : ''}@Is${this.capitalizeFirstLetter(this.getType(value))}()\n`;
        }
        classString += `  ${transformedKey}${isOptional ? '?' : ''}: ${this.getType(value)};\n\n`;
      }
    }
  
    classString += '}\n';
    classStrings.push(classString);
    generatedClasses.add(className);
  }  

  private getType(value: any): string {
    switch (typeof value) {
      case 'string':
        return 'string';
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'object':
        if (Array.isArray(value)) {
          return 'any[]';
        } else {
          return 'any';
        }
      default:
        return 'any';
    }
  }

  private getSwaggerType(value: any): string {
    switch (typeof value) {
      case 'string':
        return 'string';
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'object':
        if (Array.isArray(value)) {
          return 'array';
        } else {
          return 'object';
        }
      default:
        return 'any';
    }
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private transformKey(key: string, caseOption?: 'camelCase' | 'snake_case' | 'kebab-case' | 'PascalCase' | 'CONSTANT_CASE'): string {
    switch (caseOption) {
      case 'snake_case':
        return snakeCase(key);
      case 'kebab-case':
        return kebabCase(key);
      case 'PascalCase':
        return pascalCase(key);
      case 'CONSTANT_CASE':
        return constantCase(key);
      case 'camelCase':
      default:
        return camelCase(key);
    }
  }
}
