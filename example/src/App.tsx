/* eslint-disable */
import React, { useState }  from "react";
import { StyleSheet, View, Button, Platform, Alert, TextInput } from "react-native";
// import "fast-text-encoding"; // TextEncoder/TextDecoder polyfill for protobuf-es

// The default protobuf-es bindings
import { start, getInfo, listChannels, subscribeState, channelAcceptor, listPeers, connectPeer } from "../../src/index";

// Access to the core API
// import TurboLnd from "../../src/core/NativeTurboLnd";

export default function App() {
  const [nodeUri, setNodeUri] = useState("");

  return (
    <View style={styles.container}>
      <Button
        title="start"
        onPress={async () => {
          let lnddir: string = "";
          if (Platform.OS === "android") {
            lnddir = "/data/user/0/com.turbolndexample/files/";
          } else if (Platform.OS === "ios") {
            lnddir = "/Users/coco/Library/Containers/52531BA7-939F-4BEB-A572-92BB9ADEDDBE/Data/Documents/";
          } else if (Platform.OS === "macos") {
            lnddir = "/Users/coco/Library/Containers/org.reactjs.native.TurboLndExample/Data/Library/Application Support/";
          }

          console.log(
            await start(
              `--lnddir="${lnddir}"
              --noseedbackup
              --nolisten
              --bitcoin.active
              --bitcoin.regtest
              --bitcoin.node=neutrino
              --feeurl="https://nodes.lightning.computer/fees/v1/btc-fee-estimates.json"
              --routing.assumechanvalid
              --tlsdisableautofill
              --db.bolt.auto-compact
              --db.bolt.auto-compact-min-age=0
              --neutrino.connect=192.168.10.120:19444`
            )
          );
        }}
      />
      <Button
        title="getInfo"
        onPress={async () => {
          console.log(
            "getInfo",
            await getInfo({}),
          );
        }}
      />
      <Button
        title="getInfo loop"
        onPress={async () => {
          const startTime = performance.now();
          for (let i = 0; i < 100; i++) {
            await getInfo({});
          }
          const endTime = performance.now();
          const executionTime = endTime - startTime;

          console.log("done");
          console.log(`Execution time: ${executionTime} milliseconds`);
          if (!__DEV__) {
            Alert.alert(`Execution time: ${executionTime} milliseconds`);
          }
        }}
      />
      <Button
        title="subscribeState"
        onPress={async () => {
          subscribeState({}, (state) => {
            console.log("state", state);
          }, (err) => {
            console.log("error from subscribeState", err);
          });
        }}
      />
      <Button
        title="channelAcceptor"
        onPress={async () => {
          const acceptor = channelAcceptor((request) => {
            acceptor.send({
              accept: true,
              pendingChanId: request.pendingChanId,
            });
          }, (error) => {
            console.error(error);
          });
          console.log("channelAcceptor", acceptor);
        }}
      />
      <Button
        title="listChannels"
        onPress={async () => {
          const result = await listChannels({
            activeOnly: true,
          });

          console.log("listChannels", result);
        }}
      />
      <Button
        title="listPeers"
        onPress={async () => {
          const result = await listPeers({});

          console.log("listPeers", result);
        }}
      />
      <View style={{ flexDirection: "column" }}>
        <TextInput
          placeholder="pubkey@ip"
          value={nodeUri}
          onChangeText={setNodeUri}
          placeholderTextColor={"gray"}
          style={{ fontFamily: "monospace", color: "white" }}
        />
        <Button
          onPress={async () => {
            const [pubkey, host] = nodeUri.split("@");

            const result = await connectPeer({
              addr: {
                host: pubkey,
                pubkey: host,
              }
            });
            console.log("connectPeer", result);
          }}
          title="connectPeer"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
