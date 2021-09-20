// screens/AddUserScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';



class TCPSender extends Component {
    constructor() {
        super();
        this.state = {
            ip: '192.168.88.234',
            port: 5050,
            command: 'test',
        };
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    sendCommand() {
        console.log('Connection starting on ' + this.state.ip + ':' + this.state.port);

        if (this.state.command === '') {
            alert('Command is empty!')
        } else {
            // Create socket
            const client = TcpSocket.createConnection({
                host: '192.168.88.234',
                port: 5050
            }, () => {
                console.log('Connection started on ' + this.state.ip + ':' + this.state.port);
// Write on the socket
client.write(this.state.command);
console.log("Command Sent :" + this.state.command)

                // // Close socket
                // client.destroy();
            });
            

            client.on('data', function (data) {
                console.log('message was received', data);
            });

            client.on('error', function (error) {
                console.log(error)
                alert(error);
            });

            client.on('close', function () {

                console.log('Connection closed!');
            });
        }
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'IP Address'}
                        value={this.state.ip}
                        onChangeText={(val) => this.inputValueUpdate(val, 'ip')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput

                        placeholder={'Port'}
                        value={this.state.port.toString()}
                        onChangeText={(val) => this.inputValueUpdate(val, 'port')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Command'}
                        value={this.state.command}
                        onChangeText={(val) => this.inputValueUpdate(val, 'command')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Send'
                        onPress={() => this.sendCommand()}
                        color="#19AC52"
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default TCPSender;