import React, { useEffect, useState, createRef }from 'react'
import { Card, CardActions, CardActionsArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const NewsCard = ({article : {description, publishedAt, source, title, url, urlToImage}, i, activeArticle}) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);

    useEffect(() => {
        if(i === activeArticle && elRefs[activeArticle]) {
            elRefs[activeArticle].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [i, activeArticle, elRefs]);



  return (
    <Card className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
        <CardActionsArea href={url} target="_blank">
            <CardMedia className={classes.media} image={urlToImage || 'https://wiki.dave.eu/images/4/47/Placeholder.png'} />
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                <Typography variant="body2" color="textSecondary" component="h2">{source.map}</Typography>
            </div>  
            <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
            </CardContent>
        </CardActionsArea>
        <CardActions className={classes.cardActions}>
            <Button size="small" color="primary">Learn More</Button>
            <Typography variant="h5" color="textSecondary" component="h2">{i + 1}</Typography>
        </CardActions>

    </Card>
  )
}

export default NewsCard