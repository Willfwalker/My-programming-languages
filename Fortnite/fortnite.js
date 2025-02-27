class FortniteScript {
    constructor() {
      this.variables = {};
      this.output = ''; // Add output storage
    }
  
    interpret(code) {
      // Split code into lines
      const lines = code.split('\n').map(line => line.trim()).filter(line => line);
  
      for (let line of lines) {
        // Parse and execute each line
        this.executeLine(line);
      }
    }
  
    executeLine(line) {
      // Drop (variable declaration)
      if (line.startsWith('drop')) {
        const match = line.match(/drop\s+(\w+)\s+with\s+(.+)/);
        if (match) {
          const [_, varName, value] = match;
          this.variables[varName] = this.evaluateValue(value);
        }
      }
      
      // Storm (if statement)
      else if (line.startsWith('storm')) {
        const match = line.match(/storm\s+(.+)\s+then/);
        if (match) {
          const condition = this.evaluateValue(match[1]);
          // Handle conditional logic
        }
      }
      
      // Eliminate (delete variable)
      else if (line.startsWith('eliminate')) {
        const match = line.match(/eliminate\s+(\w+)/);
        if (match) {
          delete this.variables[match[1]];
        }
      }
      
      // Shield (print/console.log)
      else if (line.startsWith('shield')) {
        const match = line.match(/shield\s+(.+)/);
        if (match) {
          const value = this.evaluateValue(match[1]);
          this.output += value + '\n';
        }
      }
    }
  
    evaluateValue(expression) {
      // Check if it's a variable reference
      if (this.variables.hasOwnProperty(expression)) {
        return this.variables[expression];
      }
      
      // Check if it's a mathematical expression
      if (expression.includes('+') || expression.includes('-') || 
          expression.includes('*') || expression.includes('/')) {
        
        // Replace variable names with their values
        let evalExp = expression;
        for (const [varName, value] of Object.entries(this.variables)) {
          evalExp = evalExp.replace(new RegExp(varName, 'g'), value);
        }
        
        try {
          return eval(evalExp); // Safely evaluate the mathematical expression
        } catch (e) {
          console.error('Invalid mathematical expression');
          return 0;
        }
      }
      
      // Check if it's a number
      if (!isNaN(expression)) {
        return Number(expression);
      }
      
      // Return as string if nothing else matches
      return expression.replace(/["']/g, '');
    }
  
    // Add method to get output
    getOutput() {
        return this.output;
    }
  
    // Add method to reset output and variables
    reset() {
        this.variables = {};
        this.output = '';
    }
  }
  
  // Example usage:
  const fortScript = new FortniteScript();
  
  const exampleCode = `
    drop shield_potion with 100
    drop mini_shields with 25
    shield shield_potion
    eliminate shield_potion
    storm mini_shields > 20 then
  `;
  
  fortScript.interpret(exampleCode);