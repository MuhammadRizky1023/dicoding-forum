import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {MemoryRouter} from 'react-router-dom';
import {ThreadItem} from './ThreadItem';

//test ci protect
const fakeThread = {
  id: 'thread-1',
  title: 'Belajar Testing React',
  body: 'Thread ini berisi testing komponen React',
  category: 'testing',
  createdAt: '2023-01-01T00:00:00.000Z',
  totalComments: 3,
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: 'user-1',
    name: 'Rizky',
    avatar: 'avatar.png',
  },
};

describe('ThreadItem component', () => {
  it('should render thread title and body correctly', () => {
    render(
        <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
        >
          <ThreadItem
            thread={fakeThread}
            authUser={{id: 'user-1'}}
            onVoteThread={() => {}}
          />
        </MemoryRouter>,
    );

    expect(screen.getByText('Belajar Testing React')).toBeInTheDocument();
    expect(screen.getByText(/Thread ini berisi/i)).toBeInTheDocument();
  });

  it('should render category tag when category exists', () => {
    render(
        <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
        >
          <ThreadItem
            thread={fakeThread}
            authUser={{id: 'user-1'}}
            onVoteThread={() => {}}
          />
        </MemoryRouter>,
    );

    expect(screen.getByText('#testing')).toBeInTheDocument();
  });

  it('should call onVoteThread when upvote button clicked', () => {
    const mockVote = jest.fn();

    render(
        <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
        >
          <ThreadItem
            thread={fakeThread}
            authUser={{id: 'user-1'}}
            onVoteThread={mockVote}
          />
        </MemoryRouter>,
    );

    const upVoteButton = screen.getAllByRole('button')[0];

    fireEvent.click(upVoteButton);

    expect(mockVote).toHaveBeenCalled();
  });

  it('should disable vote buttons when user not logged in', () => {
    render(
        <MemoryRouter
         future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }} 
        >
          <ThreadItem
            thread={fakeThread}
            authUser={null}
            onVoteThread={() => {}}
          />
        </MemoryRouter>,
    );

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });
});
