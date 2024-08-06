import { Typography, Button } from '@mui/material'
import React from 'react'
import useStyles from './styles'

function Pagination({ currentPage, totalPages, setPage }) {
    const classes = useStyles()

    console.log('totalPages', totalPages)

    if (totalPages === 0) return null;

    const handlePrev = () => {
        if (currentPage !== 1) {
            setPage((prev) => prev - 1)
        }
    }
    const handleNext = () => {
        if (currentPage !== totalPages) {
            setPage((prev) => prev + 1)
        }
    }

    return (
      <div className={classes.container}>

        <Button onClick={handlePrev} className={classes.button} variant="contained" color="primary" type="button">
          Prev
        </Button>

        <Typography variant="h4" className={classes.pageNumber}>
          {currentPage}
        </Typography>

        <Button onClick={handleNext} className={classes.button} variant="contained" color="primary" type="button">
          Next
        </Button>

      </div>
    )
}

export default Pagination
