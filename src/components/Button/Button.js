import { LoadMoreBtn } from "./Button.styled"

export const Button = ({onClick}) => {
    return (
        <LoadMoreBtn type='button' onClick={onClick}>Load more</LoadMoreBtn>
    )
}