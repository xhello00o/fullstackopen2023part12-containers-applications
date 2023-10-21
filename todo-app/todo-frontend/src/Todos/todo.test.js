import { Todo } from "./List";
import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import {expect, jest, test} from '@jest/globals';




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


    const mockDelete =  jest.fn()
    const mockSetDone =  jest.fn()

    test('Correctly displayed the True todo', () => {

        render(<Todo todo={todoTrue} onClickComplete={mockSetDone} onClickDelete={mockDelete}/>)  
        
        const todoText = screen.queryByText(todoTrue.text)
        const doneText = screen.queryByText('This todo is done')
        const button = screen.getAllByRole('button')

        expect(todoText).toBeDefined()
        expect(doneText).toBeDefined()
        expect(button).toHaveLength(1)
    } )

    test('Correctly displayed the False todo', () => {

        render(<Todo todo={todoFalse} onClickComplete={mockSetDone} onClickDelete={mockDelete}/>)  
        
        const todoText = screen.queryByText(todoTrue.text)
        const notDoneText = screen.queryByText('This todo is not done')
        const button = screen.getAllByRole('button')

        expect(todoText).toBeDefined()
        expect(notDoneText).toBeDefined()
        expect(button).toHaveLength(2)
    } )

    test('Delete Button work properly',async()=> {
        

        render(<Todo todo={todoFalse} onClickComplete={mockSetDone} onClickDelete={mockDelete}/>) 
        
        const user = userEvent.setup()
        const deleteButton = screen.getByRole('button', {name:'Delete'})
        
        await user.click(deleteButton)

        expect(mockDelete.mock.calls).toHaveLength(1)
        
    })

    test('Set as Done Button work properly',async()=> {
        

        render(<Todo todo={todoFalse} onClickComplete={mockSetDone} onClickDelete={mockDelete}/>) 
        
        const user = userEvent.setup()
        const setDoneButton = screen.getByRole('button', {name:'Set as done'})
        
        await user.click(setDoneButton)

        expect(mockSetDone.mock.calls).toHaveLength(1)
        
    })
} )