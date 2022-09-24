
 const state = {
    hideCompleted: false,
    formIsValid: false,
    todos: [
      {
        text: 'buy milk',
        completed: true,
      },
      {
        text: 'clean room',
        completed: false,
      },
      {
        text: 'learn js',
        completed: false,
      },
    ],
  }
  
  
  
  
  const render = () => {
    resetDOMList()
    renderDOMList()
    renderDOMFormStatus()
    renderDOMHelperMessage()
  }
  
  
  const getVisibleTodos = () =>
    state.todos
      .filter(item => state.hideCompleted
        ? !item.completed
        : true
      )
  
  const resetDOMList = () =>
    document
      .querySelectorAll('#todos ul *')
      .forEach($ => $.remove())
  
  const renderDOMList = () =>
    getVisibleTodos()
      .forEach(renderDOMListItem)
      
  const renderDOMListItem = (item) => {
    
    const li = document.createElement('li')
    
    
    const txt = document
      .createTextNode(item.text)
    
    li.appendChild(txt)
    
    
    if (item.completed) {
      li.className = 'is-done'
    }
    
    
    li.addEventListener('click', () => {
      item.completed = !item.completed
      render()
    })
    
    document
       .querySelector('#todos ul')
       .appendChild(li)
  }
  
  const getHelperMessage = () =>
    getVisibleTodos().length
      ? null
      : 'Create your first task!'
  
  const renderDOMHelperMessage = () =>
    document
      .querySelector('#todos pre')
      .innerHTML = getHelperMessage()
  
  const getFormClassName = () =>
    state.formIsValid
      ? 'is-valid'
      : ''
  
  const renderDOMFormStatus = () =>
    document
      .querySelector('#todos form')
      .className = getFormClassName()
        
  
  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    
    const textEl = e.target[0]
    

    if (!textEl.value) return
    
   
    state.todos.push({
      completed: false,
      text: textEl.value,
    })
    
    
    render()
    
  
    textEl.value = ''
    textEl.focus()
  }
  
  document
    .querySelector('#todos form')
    .addEventListener('submit', handleSubmit)
  

  const handleForm = (e) => {

    const len = e.target.value.length
    state.formIsValid = len > 0
    
    render()
  }
  
  document
    .querySelector('#todos [type="text"]')
    .addEventListener('keyup', handleForm)
  
  
  const handleHide = (e) => {

    state.hideCompleted = e
      .target
      .checked
    
    render()
   }
  
  document
    .querySelector('[type="checkbox"]')
    .addEventListener('click', handleHide)
  
  
  
  
  render()
