import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> calls correct properties on submit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#URL')

  fireEvent.change(title, {
    target: { value: 'ABC of testing' }
  })

  fireEvent.change(author, {
    target: { value: 'Michael Testaguy' }
  })

  fireEvent.change(url, {
    target: { value: 'michael.co.eu' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls[0][0].title).toBe('ABC of testing')
  expect(createBlog.mock.calls[0][0].author).toBe('Michael Testaguy')
  expect(createBlog.mock.calls[0][0].url).toBe('michael.co.eu')

})