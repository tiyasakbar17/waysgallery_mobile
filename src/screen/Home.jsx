import { Container, Text } from 'native-base'
import React from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import Card from '../component/home/Card'
import { getPosts, loadData } from '../redux/actions/Auth'

const Home = ({ Auth, getPosts, loadData }) => {

    React.useEffect(() => {
        if (!Auth.userData) {
            loadData()
        }
        if (!Auth.posts) {
            getPosts()
        }
    }, [Auth.posts, Auth.userData])

    console.log("CEK DATA DIRI", Auth.userData);

    if (Auth.loadingPosts) {
        return (
            <Text>
                Loading....
            </Text>
        )
    }
    const renderItem = ({ item }) => (
        <Card title={item.title} fullName={item.createdBy.fullName} description={item.description} avatar={item.createdBy.avatar} time={item.createdAt} image={item.photos[0].image} />
    );
    return (
        <Container>
            <FlatList
                data={Auth.posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </Container>
    )
}

const mapStateToProps = (state) => ({
    Auth: state.Auth
})

const mapDispatchToProps = {
    getPosts,
    loadData
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
