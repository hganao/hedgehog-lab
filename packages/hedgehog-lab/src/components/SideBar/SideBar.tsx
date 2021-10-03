import React, {useState} from 'react';
import {Collapse, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Tooltip} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import SideBarItem from './SideBarItem';
import {tutorials} from '../../tutorials';
import {Theme} from '@mui/material/styles';
import clsx from 'clsx';
import DelButton from "./DelButton";

interface SideBarProps {
    handleLoadTutorial: (event: React.MouseEvent, i: number) => void;
    handleLoadFile: (str: string) => void;
    getLocalCodeList: () => void;
    localList: { description: string; source: string }[];
    source: string;
    siderBarOpen: boolean;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: 'hidden',
            width: 0
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar
        },
        drawerContainer: {
            overflowX: 'hidden',
            overflowY: 'auto',
            height: '100%',
            '&::-webkit-scrollbar': {
                display: 'fixed',
                width: 10,
                height: 1
            },
            '&::-webkit-scrollbar-thumb': {
                display: 'fixed',
                borderRadius: 10,
                '-webkit-box-shadow': 'inset 0 0 5px rgba(0,0,0,0.2)',
                background: '#535353'
            },
            '&::-webkit-scrollbar-track': {
                display: 'fixed',
                '-webkit-box-shadow': 'inset 0 0 1px rgba(0,0,0,0)',
                borderRadius: 10,
                background: '#ccc'
            }
        },
        listItem: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            display: 'inline-block',
            width: '100%'
        },
        tooltip: {
            fontSize: '1rem'
        },
        nested: {
            paddingLeft: theme.spacing(4)
        }
    })
);

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
    const {
        handleLoadTutorial,
        siderBarOpen,
        handleLoadFile,
        getLocalCodeList,
        localList
    } = props;

    const [open, setOpen] = useState('Tutorials');

    const classes = useStyles();

    const handleSideBarItemClick = (name: string) => {
        if (open === name) {
            setOpen('');
        } else {
            setOpen(name);
        }
    };

    //console.log(localList);

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: siderBarOpen,
                [classes.drawerClose]: !siderBarOpen
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: siderBarOpen,
                    [classes.drawerClose]: !siderBarOpen
                })
            }}>
            <Toolbar/>

            <div className={classes.drawerContainer}>
                <List dense>
                    <SideBarItem
                        handleSideBarItemClick={handleSideBarItemClick}
                        name={'Tutorials'}
                        open={open}>
                        <Collapse in={true} timeout="auto" unmountOnExit>
                            <List>
                                {tutorials.map((tutorial: { description: React.ReactNode }, i: number) => {
                                    return (
                                        <Tooltip
                                            key={`${i}-${Date.now()}`}
                                            placement="top"
                                            title={tutorial.description as string}
                                            arrow>
                                            <ListItemButton dense>
                                                <ListItem
                                                    dense
                                                    onClick={(e) => handleLoadTutorial(e, i)}>
                                                    <ListItemText>
                                                      <span className={classes.listItem}>
                                                        {i + 1}. {tutorial.description}
                                                      </span>
                                                    </ListItemText>
                                                </ListItem>
                                            </ListItemButton>
                                        </Tooltip>
                                    );
                                })}
                            </List>
                        </Collapse>
                    </SideBarItem>

                    <SideBarItem
                        handleSideBarItemClick={handleSideBarItemClick}
                        name={'Local Code'}
                        open={open}>
                        <Collapse in={true} timeout="auto" unmountOnExit>
                            <List>
                                {localList.length > 0 &&
                                localList.map((item: { description: string; source: string }, i: number) => {
                                    return (
                                        <Tooltip
                                            key={`${i}-${Date.now()}`}
                                            placement="top"
                                            title={item.description}
                                            arrow>
                                            <ListItemButton dense>
                                                <ListItem
                                                    secondaryAction={
                                                        <DelButton name={item.description}
                                                                   getLocalCodeList={getLocalCodeList}/>
                                                    }
                                                    dense
                                                    onClick={() => handleLoadFile(item.source)}>
                                                    <ListItemText>
                                                        <span>{item.description}</span>
                                                    </ListItemText>

                                                </ListItem>
                                            </ListItemButton>
                                        </Tooltip>
                                    );
                                })}
                            </List>
                        </Collapse>
                    </SideBarItem>
                </List>
            </div>
        </Drawer>
    );
};

export default SideBar;
