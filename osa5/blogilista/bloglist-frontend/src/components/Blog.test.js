import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('Blog component only renders title and author by default, no url or likes', async () => {
  const mockHandler1 = jest.fn()
  const mockHandler2 = jest.fn()

  const useri = {
    username: 'Test',
    name: 'Testaaja Pertti'
  }

  const blog = {
    title: 'titteli',
    author: 'Kirjoittaja',
    url: 'www.sosoite.net',
    likes: 10,
    user: useri
  }

  const component = render(
    <Blog blog={blog} user={useri} likeBlog={mockHandler1} deleteBlog={mockHandler2}/>
  )

  expect(component.getAllByText(/titteli/)[0]).toBeVisible()
  expect(component.getAllByText(/titteli/)[1]).not.toBeVisible()

  expect(component.getAllByText(/Kirjoittaja/)[0]).toBeVisible()
  expect(component.getAllByText(/Kirjoittaja/)[1]).not.toBeVisible()

  expect(component.getByText(/www.sosoite.net/)).not.toBeVisible()

  expect(component.getByText(/10/)).not.toBeVisible()

})

test('After a click, all components are visible', async () => {
  const mockHandler1 = jest.fn()
  const mockHandler2 = jest.fn()

  const useri = {
    username: 'Test',
    name: 'Testaaja Pertti'
  }

  const blog = {
    title: 'titteli',
    author: 'Kirjoittaja',
    url: 'www.sosoite.net',
    likes: 10,
    user: useri
  }

  const component = render(
    <Blog blog={blog} user={useri} likeBlog={mockHandler1} deleteBlog={mockHandler2}/>
  )

  // const clicker = jest.fn()
  const button = component.getByText('view')
  fireEvent.click(button)
  // expect(clicker.mock.calls).toHaveLength(1)

  expect(component.getAllByText(/titteli/)[1]).toBeVisible()
  expect(component.getAllByText(/Kirjoittaja/)[1]).toBeVisible()
  expect(component.getByText(/www.sosoite.net/)).toBeVisible()
  expect(component.getByText(/10/)).toBeVisible()

})