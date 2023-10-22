/* eslint-disable testing-library/no-debugging-utils */
import { Todo } from "./List";
import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {jest,expect,test} from '@jest/globals'



describe('Tests for Single Todo', () => {

    

    const todoTrue = {
        "_id": "652fe63d27229bb36b289de2",
        "text": "Write code",
        "done": true
    }
    const todoFalse = {
        "_id": "652fe63d27229bb36b289de3",
        "text": "Learn about containers",
        "done": false
    } 

    const mockSetDone =  jest.fn().mockName('setDone')
    const mockDelete =  jest.fn().mockName('Delete')
    
    

    test('Correctly displayed the True todo', () => {

        render(<Todo todo={todoTrue} onClickComplete={()=>mockSetDone} onClickDelete={()=>mockDelete}/>)  
        
        const todoText = screen.queryByText(todoTrue.text)
        const doneText = screen.queryByText('This todo is done')
        const button = screen.getAllByRole('button')

        expect(todoText).toBeDefined()
        expect(doneText).toBeDefined()
        expect(button).toHaveLength(1)
    } )

    test('Correctly displayed the False todo', () => {

        render(<Todo todo={todoFalse} onClickComplete={()=>mockSetDone} onClickDelete={()=>mockDelete}/>)  
        
        const todoText = screen.queryByText(todoTrue.text)
        const notDoneText = screen.queryByText('This todo is not done')
        const button = screen.getAllByRole('button')

        expect(todoText).toBeDefined()
        expect(notDoneText).toBeDefined()
        expect(button).toHaveLength(2)
    } )

    test('Delete Button work properly',async()=> {
        const user = userEvent.setup()

        
        

        render(<Todo todo={todoFalse} onClickComplete={()=>mockSetDone} onClickDelete={()=>mockDelete}/>) 
        screen.debug()
        
        const deleteButton = screen.getByRole('button', {name:'Delete'})
        await user.click(deleteButton)
        expect(mockDelete).toHaveBeenCalledTimes(1)
        expect(mockSetDone).not.toBeCalled()
        
    })

    test('Set as Done Button work properly',async()=> {
        const user = userEvent.setup()
        mockDelete.mockReset()

        render(<Todo todo={todoFalse} onClickComplete={()=>mockSetDone} onClickDelete={()=>mockDelete}/>) 
        screen.debug()
        
        const setDoneButton = screen.getByRole('button', {name:'Set as done'})
        
        await user.click(setDoneButton)
        expect(mockSetDone).toHaveBeenCalledTimes(1)
        
    })
} )